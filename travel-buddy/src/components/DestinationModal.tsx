import React, { FC } from 'react';
import '../styles/DestinationModal.css';

interface DestinationInterface {
    country?: string;
    city?: string;
    rating?: string;
    imgURL?: string;
}

// Note: The button must be alignes with the rating-stars when they are added
const DestinationModal: React.FC<DestinationInterface> = ({country, city, rating, imgURL}) => {

    return (
        <div id='modal-container'>
            <button id='x-button'>X</button>
            <img src="https://static.independent.co.uk/2022/04/26/11/iStock-535455441.jpg" alt="Error" />
            <div id='info-container'>
                <div id='title-container'>
                    <h1>Sydney, Australia</h1>
                </div>
                <div id="rating-container" className='addPadding'>
                    Here comes rating
                </div>
                <div id='tag-container' className='addPadding'>
                    Oceania    City    Beach
                </div>
                <div id="description-container" className='addPadding'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras volutpat vulputate mauris vitae eleifend. Praesent viverra diam at libero consectetur gravida. Aenean facilisis enim mi, et efficitur diam ornare pharetra. Aliquam malesuada erat tortor, sed cursus purus facilisis ut. Etiam convallis laoreet auctor. Ut accumsan nisl lorem, ut maximus erat laoreet sit amet. Nam semper bibendum dictum. In venenatis sapien vitae orci condimentum faucibus. Nunc in lorem erat.

                    In dapibus pretium urna, at sollicitudin urna mattis quis. Nunc sit amet nisl gravida, congue erat a, luctus neque. Suspendisse potenti. Integer consectetur sapien neque, eget feugiat nisi eleifend id. Suspendisse vehicula mattis risus, convallis tincidunt tellus vehicula sit amet. Ut commodo enim diam, ut blandit enim congue in. Aenean porttitor leo est, nec convallis justo lacinia at. Integer id augue malesuada, venenatis mi sed, cursus felis. Nunc quis interdum leo, ut pulvinar nulla. Duis turpis mauris, finibus a dolor quis, mollis aliquet mauris. Integer non velit a turpis mattis tristique. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam urna lectus, semper in venenatis vitae, maximus vitae nisi.

                    Donec rhoncus risus vestibulum aliquet iaculis. Vestibulum porttitor metus et ante faucibus placerat. Integer magna dui, semper malesuada lacinia ut, laoreet et ligula. Maecenas aliquet consequat turpis, quis dictum tortor vehicula sed. Sed aliquet quam in sollicitudin efficitur. Pellentesque fermentum felis in bibendum aliquet. Cras felis velit, bibendum sit amet purus at, mattis efficitur magna. Nulla pulvinar erat id magna tincidunt commodo. Proin luctus, nisl vel convallis finibus, ipsum risus varius ligula, sit amet mattis urna felis in ante. Aliquam eu erat metus. Sed quis pretium ante, eget maximus neque. Maecenas faucibus dictum dignissim.
                </div>
            </div>
        </div>
    );
}

export default DestinationModal;
