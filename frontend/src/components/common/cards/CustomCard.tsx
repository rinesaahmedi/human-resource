import React from 'react';

interface props {
    title: string,
    description?: string,
    children?: any,
    style?: any,
    fontStyle?: any
    descriptionStyle?: any
}

const CustomCard = (props: props) => {
    const {
        title,
        description,
        children,
        style,
        fontStyle,
        descriptionStyle
    } = props
    return (
        <div className={`${style} max-w-[500px] xs:w-[100%] border border-black h-[auto] w-full rounded-[20px] p-[30px]`}>
            <div className={'flex flex-col gap-[10px]'}>
                <h1 className={`${fontStyle} leading-[110%] text-[40px]`}>{title}</h1>
                <p className={`${descriptionStyle} `}>{description}</p>
            </div>
            {children}
        </div>
    );
};

export default CustomCard;