import Dashboard from "./Dashboard";
import TopBar from "./TopBar";

function Home() {
    return (
        <>
            <style>{`
                :root {
                    --navbar-height: 56px;
                }
            `}</style>
            <TopBar />
            <Dashboard />
        </>
    );
}

export default Home;