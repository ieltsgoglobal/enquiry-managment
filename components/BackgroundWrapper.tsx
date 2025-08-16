import React from 'react';

type BackgroundWrapperProps = {
    children: React.ReactNode;
    backgroundImage: string;
};

const BackgroundWrapper: React.FC<BackgroundWrapperProps> = ({ children, backgroundImage }) => {
    return (
        <div
            className="flex items-center justify-center min-h-screen bg-gray-100"
            style={{
                backgroundImage: `url('${backgroundImage}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {children}
        </div>
    );
};

export default BackgroundWrapper;
