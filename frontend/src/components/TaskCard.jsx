import React, { useState } from 'react';

const TaskCard = ( { task, userRole, onComplete, onEdit, onDelete } ) => {
    const { _id, date, link, title, description, isCompleted } = task;
    const [status, setStatus] = useState( isCompleted );

    return (
        <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
            {/* Task Title and Status */}
            <div className="p-4 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
                <span
                    className={`px-2 py-1 text-xs font-semibold text-white rounded ${status ? 'bg-green-500' : 'bg-yellow-500'
                        }`}
                >
                    {status ? 'Completed' : 'Pending'}
                </span>
            </div>

            {/* Task Description */}
            <div className="px-4 py-2">
                <p className="text-gray-700">{description}</p>
                <p className="text-sm text-gray-500">{new Date( date ).toLocaleDateString()}</p>
            </div>

            {/* Action Buttons */}
            <div className="px-4 py-2 mt-2 flex gap-2">
                <button
                    className="bg-black text-white px-2 py-1 rounded"
                    onClick={() => {
                        setStatus( true );
                        onComplete( _id );
                    }}
                >
                    Mark Completed
                </button>
                {userRole === 'Admin' && (
                    <>
                        <button
                            className="bg-blue-500 text-white px-2 py-1 rounded"
                            onClick={() => onEdit( _id )}
                        >
                            Edit
                        </button>
                        <button
                            className="bg-red-500 text-white px-2 py-1 rounded"
                            onClick={() => onDelete( _id )}
                        >
                            Delete
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default TaskCard;
