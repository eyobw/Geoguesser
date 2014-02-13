function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
}

function lat(){
return getRandomInRange(-180,180, 3);
}

function long(){
return getRandomInRange(-180,180, 3);
}