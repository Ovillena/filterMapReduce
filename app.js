// Observe the list of people below
const people = [{ name: "John Doe", age: 16 },
{ name: "Thomas Calls", age: 19 },
{ name: "Liam Smith", age: 20 },
{ name: "Jessy Pinkman", age: 18 }
];
// Observe the coffeeLovers list containing people who are coffee lovers
const coffeeLovers = ["John Doe", "Liam Smith", "Jessy Pinkman"];
// use map, filter, and reduce to do the following:
/*
1. Filter all people above the age of 18 (use a function called ageAbove18)
2. Transform the people array so all people in the array who are in coffeeLovers have a property
   in their object called coffeeLover, set either to true or false. (Use a function called addCoffeeLoverProperty)
3. Get the total summed age of all people who are coffee lovers and above the age of 18 (Use a function called ageReducer)
*/
const ageAbove18 = (person) => person.age >= 18; //determines if the person is 18 or above

const addCoffeeLoverProperty = (person) => {
  //adds a boolean on the person's obj on whether they are part of the coffeeLover array
  if (coffeeLovers.includes(person.name)) {
    person['coffeeLover'] = true;
  }
  else person['coffeeLover'] = false;
  return person;
};

const ageReducer = (acc, age) => acc + age; //sums up age of people

const coffeeLoversAbove18 = people.filter(person => ageAbove18(person)).map(person => addCoffeeLoverProperty(person));

const totalAgeOfCoffeeLoversAbove18 = coffeeLoversAbove18.reduce((acc, person) => ageReducer(acc, person.age), 0);

console.log(totalAgeOfCoffeeLoversAbove18);









const fs = require('fs');
const readlineSync = require('readline-sync');
const path = require('path');

let user = {};
user['username'] = readlineSync.question('enter a username: ');
user['password'] = readlineSync.question('enter a password: ');


const register = (username, password, cb) => {

  const userPath = path.join(__dirname, 'registrar.txt');
  let registrarData = [];

  fs.readFile(userPath, 'utf-8', (err, data) => {
    if (err) {
      fs.writeFile(userPath, `${username},${password}\n`, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve('Registrar created')
        }
      })
    } else {
      registrarData = data;
      let registrarUsers = registrarData.split('\n');
      if (registrarUsers.includes(`${username},${password}`)) {
        reject('they exist');
      } else {
        fs.appendFile(userPath, `${username},${password}\n`, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log('User added')
          }
        })
      }
    }
  })
  cb
}

const blogPath = path.join(__dirname, readlineSync.question('enter a blog name: '));
console.log(blogPath)

const createBlog = (path, cb) => {
  fs.mkdir(path, (err) => {
    if (err) {
      reject('Choose a blog with another name');
    } else {
      resolve('Blog created')
    }
  })
  cb
}

const blogPostTitle = readlineSync.question('Title: ');
const blogContent = readlineSync.question('Content: ');

const createpost = (postTitle, postContent, blogName, cb) => {

  const title = postTitle.split(' ').join('_');
  let newPath = path.join(blogName, `${title}.txt`);
  console.log(newPath)

  const wholePost = `likes :1\nlikedBy: you\n${postContent}`;

  let i = 0;
  while (fs.existsSync(newPath)) {
    newPath = path.join(blogName, `${title}${i}.txt`)
    i++;
  }

  fs.writeFile(newPath, wholePost, (err) => {
    if (err) {
      reject("'blog no exist ma'dude'");
    }
  })
  cb
}

const likePost = (blogName, postTitle, username) => {
  return new Promise((resolve, reject) => {

  })
}