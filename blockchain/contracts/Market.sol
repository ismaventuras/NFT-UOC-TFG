// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
// nftReceiver
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";


contract Market is IERC721Receiver, Ownable {
    using Counters for Counters.Counter;
    
    function onERC721Received(address, address, uint256, bytes memory) public virtual override returns(bytes4){
        return this.onERC721Received.selector;
    }
    
    struct Sale {
        uint price;
        uint tokenId;
        address seller;
        address buyer;
        address nftAddress;
        bool active;
    }
    
    event ContractWhitelisted(address indexed nftAddress, address indexed by);
    event ContractBlacklisted(address indexed nftAddress, address indexed by);

    event SaleCreated(uint saleId, address indexed seller, uint price, address indexed nftAddress);
    event ItemBought(uint saleId, address indexed seller, address indexed buyer, address indexed nftAddress ,uint price);
    event SaleCanceled(uint saleId, address indexed by);

    Counters.Counter private salesCounter;
    
    mapping(uint=>Sale) public sales;

    mapping(address=>bool) private blacklisted_contracts;
    
    constructor (){
        // for(uint i=0;i<_allowed_contracts.length;i++){
        //     address _addr = _allowed_contracts[i];
        //     allowed_contracts[_addr]=true;
        // }
    }
    
    // function addBlacklistedContract(address _addr) public onlyOwner {
    //     bool exists = blacklisted_contracts[_addr];
    //     require(!exists,'contract already added');
    //     blacklisted_contracts[_addr]=true;
    //     emit ContractBlacklisted(_addr, msg.sender);
    // }
    // function removeBlacklistedContract(address _addr) public onlyOwner{
    //     bool exists = blacklisted_contracts[_addr];
    //     require(exists,'address does not exist');
    //     blacklisted_contracts[_addr]=false;
    //     emit ContractWhitelisted(_addr, msg.sender);
    // }
    
    function createSale(uint _price, uint _tokenId, address _nftContract) public{
        //require(allowed_contracts[_nftContract],'nft contract not allowed');
        require(_price > 0, 'price must be greater than 0');
        address tokenIdOwner = IERC721(_nftContract).ownerOf(_tokenId);
        require(tokenIdOwner == msg.sender, 'youre not the owner of the token');
        Sale memory new_sale = Sale(_price, _tokenId, msg.sender ,address(0), _nftContract, true);
        
        uint index = salesCounter.current();
 
        sales[index] = new_sale;
        salesCounter.increment();
        IERC721(_nftContract).safeTransferFrom(msg.sender,address(this),_tokenId);

        emit SaleCreated(index, msg.sender, _price, _nftContract);
    }

    function cancelSale(uint _saleId) public{
        Sale storage sale = sales[_saleId];
        require(msg.sender == sale.seller, 'Incorrect owner of the sale');
        sale.active = false;
        IERC721(sale.nftAddress).safeTransferFrom(address(this),sale.seller,sale.tokenId);
        emit SaleCanceled(_saleId, msg.sender);
    }
    
    function buy(uint saleIndex) public payable{
        Sale storage sale = sales[saleIndex];
        bool _isActive = sale.active;
        uint _price = sale.price;
        address _nftContract = sale.nftAddress;
        address _seller =  sale.seller;
        uint id = sale.tokenId;
        
        require(_isActive,'sale is not active or does not exist');
        require(msg.value == _price, 'not enough ether');
        
        (bool sent, ) = payable(_seller).call{value: msg.value}("");
        require(sent, "Failed to send Ether");
        
        sale.active = false;
        sale.buyer = msg.sender;
        IERC721(_nftContract).safeTransferFrom(address(this),msg.sender,id);

        emit ItemBought(saleIndex, _seller, msg.sender, _nftContract , _price );        
    }
    

    function getTotalSales() public view returns(uint){
        return salesCounter.current();
    }
    
}

