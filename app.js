import { CallClient, CallAgent } from "@azure/communication-calling";
import { AzureCommunicationTokenCredential } from '@azure/communication-common';
const { CommunicationIdentityClient } = require('@azure/communication-identity');

let call;
let callAgent;
let tokenCredential = "";
const submitToken = document.getElementById("token-submit");
const callButton = document.getElementById("call-button");
const hangUpButton = document.getElementById("hang-up-button");
const acsConnectionStringInput = document.getElementById("acs-connection-string-input");
const acsSourcePhoneNumberInput = document.getElementById("acs-source-phone-number-input");
const destinationPhoneNumberInput = document.getElementById("destination-phone-number-input");

acsConnectionStringInput.value = process.env['ACS_CONNECTION_STRING'] ?? acsConnectionStringInput.value;
acsSourcePhoneNumberInput.value = process.env['ACS_SOURCE_PHONE_NUMBER'] ?? acsSourcePhoneNumberInput.value;
destinationPhoneNumberInput.value = process.env['DESTINATION_PHONE_NUMBER'] ?? destinationPhoneNumberInput.value;

submitToken.addEventListener("click", async () => {
    const callClient = new CallClient();

    // Instantiate the identity client
    const identityClient = new CommunicationIdentityClient(acsConnectionStringInput.value);
    
    let identityResponse = await identityClient.createUser();
    console.log(`Created an identity with ID: ${identityResponse.communicationUserId}`);
    
    // Issue an access token with a validity of 24 hours and the "voip" scope for an identity
    let tokenResponse = await identityClient.getToken(identityResponse, ["voip"]);

    // Get the token and its expiration date from the response
    const { token, expiresOn } = tokenResponse;
    console.log(`Issued an access token with 'voip' scope that expires at ${expiresOn}:`);
    console.log(token);

    try {
        tokenCredential = new AzureCommunicationTokenCredential(token);
        callAgent = await callClient.createCallAgent(tokenCredential);
        callButton.disabled = false;
        submitToken.disabled = true;
        console.log("Successfully submitted token!");
    } catch(error) {
        window.alert("Please submit a valid token!");
    }
})

callButton.addEventListener("click", () => {

    console.log(`Starting call from ${acsSourcePhoneNumberInput.value} to ${destinationPhoneNumberInput.value}`);

    call = callAgent.startCall(
        [{phoneNumber: destinationPhoneNumberInput.value}], { alternateCallerId: {phoneNumber: acsSourcePhoneNumberInput.value}}
    );
    
    // toggle button states
    hangUpButton.disabled = false;
    callButton.disabled = true;
});

hangUpButton.addEventListener("click", () => {

    console.log("Hanging up the call");

    // end the current call
    call.hangUp({ forEveryone: true });

    // toggle button states
    hangUpButton.disabled = true;
    callButton.disabled = false;
    submitToken.disabled = false;
});
