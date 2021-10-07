# mongodb-ephemeral-server
A library for creating mongodb ephemeral instance for testing on the fly.

Sample-Code
```/**Import the mongodb-ephemeral-server as a property*/
const { mongoInstance } = require('mongodb-ephemeral-server');
const { mongoose } = require('mongoose');

const faker = require('faker');
const { userModel } = require('./userModel');

describe('getUserInfo', () => {
    let port = 27025;
    let dbpath = '/home/user/testingInstance/data';
    let logpath = '/home/user/testingInstane/log';

    /**In case you want to run test on windows - add the mongodExeLocation
     * Note adding this on linux won't have any effect
     * So, if you have written test on window machine
     * You need not to worry when running on a linux machine
    */
    let mongodExeLocation = 'C:/Program Files/MongoDB/Server/4.2/bin';

    /**Initialize the mongoInstance
     * Note initilizing the mongoInstance won't spin up the mongoDB testing instance
     */
    let instance = new mongoInstance(port, logpath, dbpath, mongodExeLocation);
    let dbName = 'users';

    let testingInputUserName = faker.internet.userName();
    let testingUserId = () => v4();

    beforeAll(async (done) => {

        /**Start the mongo-ephemeral-server */
        instance.start();
        let dbUri = instance.getDbUri(dbName);
        await mongoose.connect(dbUri, {});

        /**Create a doc in the userInfo Model - For Testing
         * This is the SETUP Phase, we create the resources which you want to test in this phase
        */
        let userSchema = {
            "email": testingInputEmail,
            "userId": testingUserId,
            "name": faker.name.firstName(),
            "age": faker.datatype.number(60),
            "favouriteMusicGenre": faker.music.genre(),
            "userName": faker.internet.userName,
            "lastUserBrowser": faker.internet.userAgent,
            "avatar": faker.internet.avatar()
        }

        let userSchemaInstance = new (userSchema);
        await userSchemaInstance.save();
        /**You need to call done, if done is not called then the Jest test will fail because of timeOut */
        done();
    });
    /**Even though operations in mongodb-ephemeral-server is very fast. 
     * DB operations are still expensive 15 secs timeout is reasonable
     */
    jest.setTimeout(15000);

    it("When I enter a userName or userId I expect user's details to be displayed", async (done) => {
        /**Calling the function which you want to test
         * This phase is called - INVOCATION
         */
        let queryResult = await userModel.getUserInfo(testingInputUserName, testingUserId);

        /**After you have invoked the function you need to assert the result with your expectation
         * This phase is called ASSERTION
         */
        expect(queryResult).toBeDefined();

        expect(queryResult).toEqual(
            expect.objectContatining({
                "email": testingInputEmail
            }));

        done();
    });

    afterAll(async (done) => {
        /**This is the TEARDOWN PHASE in this you close any open connection, and revert the changes your test has done 
         * Thankfully, the ephmeral(testing) server, doesn't store any data on disk, all the data is stored in memory
         * and is released when the instance is stop
        */

        /**Close the mongoose connection before 
         * you terminate the mongoInstance to avoid errors
         */
        await mongoose.connection.close();
        /**Calling the stop function will terminate the mongoInstance */
        instance.stop();
        done();
    });
});
```
