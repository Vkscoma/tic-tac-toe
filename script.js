const squareItem = document.querySelectorAll('.game--board--grid--item');

squareItem.forEach(sqaure => {
    sqaure.addEventListener('click', () => {
        // console log the data-index of the square
        console.log(sqaure.dataset.index);
    });
});