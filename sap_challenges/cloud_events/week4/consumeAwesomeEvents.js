const solaceConsumer = require('solclientjs');
require('dotenv').config();

const solaceHost = process.env.SOLACE_HOST;
const solaceUsername = process.env.SOLACE_USERNAME;
const solacePassword = process.env.SOLACE_PASSWORD;
const solaceVpn = process.env.SOLACE_VPN;
const solaceTopic ="dev-challenge/week-4/xavisanse/processed"

function consumeAwesomeEvents() {
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

    solaceConsumer.suscribe(solaceConsumer.SolclientFactory.createTopicDestination(solaceTopic), true, solaceTopic, 10000);
}

consumeAwesomeEvents();