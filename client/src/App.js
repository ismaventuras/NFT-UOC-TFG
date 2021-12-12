import { AppRouter } from "./routers/AppRouter"
import ConnectionProvider from './context/ConnectionContext';

const App = () => {

    return (
        <div className='h-100'>
            <ConnectionProvider>
                    <AppRouter/>
            </ConnectionProvider>
        </div>
    )
}

export default App