const solaceConsumer = require('solclientjs');
require('dotenv').config();

const solaceHost = process.env.SOLACE_HOST;
const solaceUsername = process.env.SOLACE_USERNAME;
const solacePassword = process.env.SOLACE_PASSWORD;
const solaceVpn = process.env.SOLACE_VPN;
const solaceTopic ="dev-challenge/week-4/xavisanse/processed"

async function consumeAwesomeEvents() {
    const factoryProps = new solaceConsumer.SolclientFactoryProperties();
    factoryProps.profile = solaceConsumer.SolclientFactoryProfiles.version10;
    solaceConsumer.SolclientFactory.init(factoryProps);
    
    const session = solaceConsumer.SolclientFactory.createSession({
        url: solaceHost,
        vpnName: solaceVpn,
        userName: solaceUsername,
        password: solacePassword,        
    });
    session.on(solaceConsumer.SessionEventCode.UP_NOTICE, function (sessionEvent) {
        console.log('=== Successfully connected and ready to consume messages. ===');
        subscribeToTopic(session, solaceTopic);
    });

    session.on(solaceConsumer.SessionEventCode.CONNECT_FAILED_ERROR, function (sessionEvent) {
        console.log('=== Connection failed: ' + sessionEvent.infoStr + ' ===');
    });

    session.on(solaceConsumer.SessionEventCode.DISCONNECTED, function (sessionEvent) {
        console.log('=== Disconnected. ===');
    });

    session.on(solaceConsumer.SessionEventCode.SUBSCRIPTION_OK, function (sessionEvent) {
        console.log('=== Subscription is now active. ===');
    });

    session.on(solaceConsumer.SessionEventCode.SUBSCRIPTION_ERROR, function (sessionEvent) {
        console.log('=== Subscription failed: ' + sessionEvent.infoStr + ' ===');
    });

    session.on(solaceConsumer.SessionEventCode.MESSAGE, function (message) {
        console.log('Received message: ' + message.getBinaryAttachment());
    });

     session.connect();

     function subscribeToTopic(session, topic) {
        try {
            const topicObject = solaceConsumer.SolclientFactory.createTopicDestination(topic);
            console.log(`Subscribing to topic: ${topic}`);
            session.subscribe(topicObject, true, topic, 10000);
        } catch (error) {
            console.error("Error subscribing to topic: " + error.toString());
        }
     }
    }
consumeAwesomeEvents();