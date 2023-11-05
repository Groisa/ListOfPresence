import ContainerTable from '@/components/ContainerTable';
import ParallaxComponent from '@/components/ParallaxComponent';
import React from 'react';

// import { Container } from './styles';

const ListOfConfirmationAndDenied: React.FC = () => {
    return (
        <>
            <ParallaxComponent />
            <ContainerTable/>
        </>
    );
}

export default ListOfConfirmationAndDenied;