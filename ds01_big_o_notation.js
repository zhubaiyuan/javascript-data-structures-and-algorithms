// ----------------------------------------------------Common Big-O complexities
function exampleLinear(n) {
    for (var i = 0; i < n; i++) {
        console.log(i);
    }
}

function exampleQuadratic(n) {
    for (var i = 0; i < n; i++) {
        console.log(i);
        for (var j = i; j < n; j++) {
            console.log(j);
        }
    }
}

function exampleCubic(n) {
    for (var i = 0; i < n; i++) {
        console.log(i);
        for (var j = i; j < n; j++) {
            console.log(j);
            for (var k = j; k < n; k++) {
                console.log(k);
            }
        }
    }
}

function exampleLogarithmic(n) {
    for (var i = 1; i < n; i=i*2) {
        console.log(i);
    }
}

exampleLinear(3);
exampleQuadratic(3);
exampleCubic(3);
exampleLogarithmic(100);

//------------------------------------- Coefficient Rule: “Get Rid of Constants”
function a(n){
    var count =0;
    for (var i=0;i<n;i++){
        count+=1;
    }
    return count;
}

function a(n){
    var count =0;
    for (var i=0;i<5*n;i++){
        count+=1;
    }
    return count;
}

function a(n){
    var count =0;
    for (var i=0;i<n;i++){
        count+=1;
    }
    count+=3;
    return count;
}

//---------------------------------------------------- Sum Rule: “Add Big-Os Up”
function a(n){
    var count =0;
    for (var i=0;i<n;i++){
        count+=1;
    }
    for (var i=0;i<5*n;i++){
        count+=1;
    }
    return count;
}

//---------------------------------------------- Product Rule: “Multiply Big-Os”
function a(n){
    var count =0;
    for (var i=0;i<n;i++){
        count+=1;
        for (var i=0;i<5*n;i++){
            count+=1;
        }
    }
    return count;
}

//----------------------------------- Polynomial Rule: “Big-O to the Power of k”
function a(n){
    var count =0;
    for (var i=0;i<n*n;i++){
        count+=1;
    }
    return count;
}

// ---------------------------------------------------------- Exercise 1, O(n^2)
function someFunction(n) {
    for (var i = 0; i < n * 1000; i++) {
        for (var j = 0; j < n * 20; j++) {
            console.log(i + j);
        }
    }
}
// 'answer: O(n^2)'

// ---------------------------------------------------------- Exercise 2, O(n^3)
function someFunction(n) {

    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
            for (var k = 0; k < n; k++) {
                for (var l = 0; l < 10; l++) {
                    console.log(i + j + k + l);
                }
            }
        }
    }

}

// ------------------------------------------------------------ Exercise 3, O(1)
function someFunction(n) {

    for (var i = 0; i < 1000; i++) {
        console.log("hi");
    }

}

// ------------------------------------------------------------ Exercise 4, O(n)
function someFunction(n) {
    for (var i = 0; i < n * 10; i++) {
        console.log(n);
    }
}

// ------------------------------------------------------- Exercise 5, O(log_2n)
function someFunction(n) {
    for (var i = 0; i < n; i * 2) {
        console.log(n);
    }
}

// ------------------------------------------------------------ Exercise 6, O(∞)
function someFunction(n) {
    while (true){
        console.log(n);
    }
}
