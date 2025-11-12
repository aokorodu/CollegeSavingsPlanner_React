import React from 'react';
import Card from '../Card/Card';
const ContentHolder: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Card>
            {children}
        </Card>
    );
};

export default ContentHolder;