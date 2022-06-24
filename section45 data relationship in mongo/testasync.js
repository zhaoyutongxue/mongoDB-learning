function first() {

    console.log("1st");


}

function second() {

    console.log("2nd");


}

function third() {
    console.log("3rd");
}

async function fnAsync() {
    await first();
    await second();
    third();
}

fnAsync();