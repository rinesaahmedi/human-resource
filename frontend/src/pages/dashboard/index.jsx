import React, {useState} from 'react';
import Sidebar from "../../components/dashboard/partials/Sidebar";
import Header from "../../components/dashboard/partials/Header";


const Index = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (

                <div className="flex h-screen overflow-hidden">
                    <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>

                    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

                        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>

                        <main className="grow">
                            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

                                <div className="sm:flex sm:justify-between sm:items-center mb-8">


                                    <div
                                        className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">


                                    </div>

                                </div>


                            </div>
                        </main>


                    </div>

                </div>
    );
};

export default Index;


