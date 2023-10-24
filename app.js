import { CallClient, CallAgent } from "@azure/communication-calling";
import { AzureCommunicationTokenCredential } from '@azure/communication-common';

// ACS_SUBSCRIPTION="Azure Communication Services"
// RG=nuance-test-rg
// ACS=nuance-test-acs
// OUT=$(az communication list-key --name $ACS --resource-group $RG --subscription "$ACS_SUBSCRIPTION")
// echo $OUT > token.json

const token = require('./token.json');
//{ "expires_on": "2023-09-27T16:23:03.136853+00:00", "token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjVFODQ4MjE0Qzc3MDczQUU1QzJCREU1Q0NENTQ0ODlEREYyQzRDODQiLCJ4NXQiOiJYb1NDRk1kd2M2NWNLOTVjelZSSW5kOHNUSVEiLCJ0eXAiOiJKV1QifQ.eyJza3lwZWlkIjoiYWNzOjRmZWNiYTEwLWY1ODEtNGUzMy1iYWY1LWEyYjdlZDJmZjZmOF8wMDAwMDAxYi03MjJlLWJlZDktMTI1Mi01NzNhMGQwMGJkODYiLCJzY3AiOjE3OTIsImNzaSI6IjE2OTU3NDUzODMiLCJleHAiOjE2OTU4MzE3ODMsInJnbiI6ImFtZXIiLCJhY3NTY29wZSI6InZvaXAiLCJyZXNvdXJjZUlkIjoiNGZlY2JhMTAtZjU4MS00ZTMzLWJhZjUtYTJiN2VkMmZmNmY4IiwicmVzb3VyY2VMb2NhdGlvbiI6InVuaXRlZHN0YXRlcyIsImlhdCI6MTY5NTc0NTM4M30.AuK1pfOarTjiC6euvgYjcnuo2xZ8Kfxi2ofBWTzCnQOOL7sl-7fE0N8vQM5nANzMbLB-N1wTTArWsxwnJ6upoH0tC3cSfJgvlyBvC3a6KBUYmy6xzv5gdgKRFTnBCWCnxDH7rE6-uMQNER4pDTxqVYn5nQlUGKuf2726mRDOzAFOyYh2mzlgTdmFZSmd_oUcZyaLkzQms3FRmee1GCLP3QiGVY95HlUgddkdLInYubkm9UfvOFD_xh3upkmRP3UFPZVxT0YJPj52zglxZnpZlczpldDegyyhn2RzGBAa1AaOsP5SP3GelKXBNooM6Ag4Wsln-8gQjPv42AgIRCOEqg", "user_id": "8:acs:4fecba10-f581-4e33-baf5-a2b7ed2ff6f8_0000001b-722e-bed9-1252-573a0d00bd86" };


let call;
let callAgent;
let tokenCredential = "";
const calleeInput = document.getElementById("callee-id-input");
const submitToken = document.getElementById("token-submit");
const callButton = document.getElementById("call-button");
const hangUpButton = document.getElementById("hang-up-button");

submitToken.addEventListener("click", async () => {
    const callClient = new CallClient(); 
    const userTokenCredential = token.token;
    console.log(userTokenCredential);
    try {
        tokenCredential = new AzureCommunicationTokenCredential(userTokenCredential);
        callAgent = await callClient.createCallAgent(tokenCredential);
        callButton.disabled = false;
        submitToken.disabled = true;
    } catch(error) {
        window.alert("Please submit a valid token!");
    }
})

callButton.addEventListener("click", () => {
    // start a call
    // To call an Azure Communication Services communication user, use 'ACS_USER_ID'.
    // call = callAgent.startCall(
    //   [ { communicationUserId: calleeInput.value } ], {}}
    // );
    // To call echo bot, use '8:echo123'.
    // call = callAgent.startCall(
    //   [ { id: calleeInput.value } ], {}}
    // );
    // To call a phone number, use 'PHONE_NUMBER'
    if (calleeInput.value == "") {
        calleeInput.value = "+14508004453";
    }
    call = callAgent.startCall(
        [ { phoneNumber: calleeInput.value } ], { alternateCallerId: { phoneNumber: '+14508004453' }}
    );
    // toggle button states
    hangUpButton.disabled = false;
    callButton.disabled = true;
});

hangUpButton.addEventListener("click", () => {
  // end the current call
  call.hangUp({ forEveryone: true });

  // toggle button states
  hangUpButton.disabled = true;
  callButton.disabled = false;
  submitToken.disabled = false;
});
