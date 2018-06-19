var faker =require('faker');
function generatePhoneBook(){
    var people =[];
    for (var id = 0; id<10; id++){
        var firstname = faker.name.firstName();
        var lastname = faker.name.lastName();
        var phonenumber = faker.phone.phoneNumber();

        people.push({
        "id": id,
        "firstname":firstname,
        "lastname": lastname,
        "phonenumber":phonenumber
        })
    }
    return {"people": people}
}
module.exports = generatePhoneBook;
