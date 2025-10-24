type GraphButtonProps = {
    imageURL: string;
    altText: string;
    onClick: () => void;
};

const GraphButton = ({ imageURL, altText, onClick }: GraphButtonProps) => {
    return (
        <>
            <img
                src={imageURL}
                width={50}
                height={50}
                alt={altText}
                onClick={onClick}
            /></>
    );
};

export default GraphButton;