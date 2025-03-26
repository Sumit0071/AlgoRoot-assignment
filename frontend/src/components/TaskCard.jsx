import React, { useState } from 'react';

const TaskCard = ( { task, userRole, onComplete, onEdit, onDelete } ) => {
    const { _id, date, title, description, isCompleted, completedBy } = task;
    const [status, setStatus] = useState( isCompleted );
    const username = completedBy || "User"  ;

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
            <div className="px-4 py-2 mt-2 flex gap-2 items-center">
                {!status && (
                    <button
                        className="bg-black text-white px-2 py-1 rounded"
                        onClick={() => {
                            setStatus( true );
                            onComplete( _id );
                        }}
                    >
                        Mark Completed
                    </button>
                )}

                {status && (
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Task completed by</span>
                        <div className="relative group">
                            <div className="w-8 h-8 flex items-center justify-center bg-green-500 text-white rounded-full cursor-pointer">
                                {username[0].toUpperCase()}
                            </div>
                            <span className="absolute left-1/2 transform -translate-x-1/2 bottom-10 w-auto bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                {username}
                            </span>
                        </div>
                    </div>
                )}

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
