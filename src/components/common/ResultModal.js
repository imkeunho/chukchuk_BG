import React from 'react';
import {Button} from "react-bootstrap";

function ResultModal({title, content, callbackFn}) {

    return (
        <div className={`fixed top-0 left-0 z-[1055] flex h-full w-full place-items-center justify-center bg-black bg-opacity-20`}>
            <div
                className="m-3 bg-white rounded-3xl opacity-100 min-w-min h-1/4">
                <div className="m-3 justify-center bg-warning-400 mt-6 mb-6 text-lg border-b-4 border-gray-500">
                    {title}
                </div>
                <div className="m-3 text-base border-orange-400 border-b-4 pb-4">
                    {content}
                </div>
                <div className="m-3 justify-end flex ">
                    <Button variant="primary"
                            onClick={() => {
                                if (callbackFn) {
                                    callbackFn();
                                }
                            }}
                    >처음으로
                    </Button>
                </div>

            </div>
        </div>
    );
}

export default ResultModal;