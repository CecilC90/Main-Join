function greeting() {
    let time = new Date().getHours();
    let greeting;

    if(time >= 5 && time < 12) {
        greeting = 'Good mroning';
    } else if(time >= 12 && time < 18) {
        greeting = 'Good afternoon';
    } else {
        greeting = 'Good evening';
    }
    
    document.getElementById('greeting').innerHTML = greeting;
}