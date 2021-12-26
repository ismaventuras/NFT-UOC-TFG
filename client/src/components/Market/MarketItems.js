
import {Col, Container, Spinner } from 'react-bootstrap'
import { MarketItem } from "./MarketItem"
import { useSelector } from "react-redux"
import { useEffect , useState } from 'react'
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';

const CustomPaginate = styled(ReactPaginate).attrs({
    // You can redifine classes here, if you want.
    activeClassName: 'active', // default to "disabled"
  })`
    margin-bottom: 2rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap:wrap;
    list-style-type: none;
    padding: 0 5rem;
    li a {
      border-radius: 7px;
      padding: 0.1rem 1rem;
      border: gray 1px solid;
      cursor: pointer;
    }
    li.previous a,
    li.next a,
    li.break a {
      border-color: transparent;
    }
    li.active a {
      background-color: #0366d6;
      border-color: transparent;
      color: white;
      min-width: 32px;
    }
    li.disabled a {
      color: grey;
    }
    li.disable,
    li.disabled a {
      cursor: default;
    }
  `;

function Items({currentItems}) {
    return(
        <>
            {currentItems && currentItems.length > 0 &&
                currentItems.map(item => (
                    item.active && <Col key={item.saleId}><MarketItem item={item}/></Col>
                ))
            }
        </>
    )
}

function PaginatedItems({itemsPerPage}) {
    const saleItems = useSelector(state => state)
    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + itemsPerPage;
        //console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(saleItems.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(saleItems.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, saleItems]);

      // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % saleItems.length;
        // console.log(
        // `User requested page number ${event.selected}, which is offset ${newOffset}`
        // );
        setItemOffset(newOffset);
    };

    return (
        <>
            <Items currentItems={currentItems}/>
            <div className='col-lg-12 mt-4'>
                <CustomPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                />  
            </div>
        </>
    )
}

export const MarketItems = () => {
    const saleItems = useSelector(state => state)

    return (
        <Container className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 py-4'>
            {saleItems && saleItems.length > 0 
            ? 
                <PaginatedItems itemsPerPage={3}/>
            :
            <div className='d-flex justify-content-center w-100 flex-column align-items-center gap-2'>
                <Spinner animation="grow" size="lg" className="" />
                <p className='fs-2'>Loading data from market...</p>
            </div>
            }
        </Container>
    )
}