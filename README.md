# References

- https://learn.microsoft.com/en-us/azure/communication-services/quickstarts/telephony/pstn-call?pivots=platform-web
- https://learn.microsoft.com/en-us/azure/communication-services/quickstarts/identity/access-tokens?tabs=windows&pivots=programming-language-javascript

# Install

```
cd ~/src/acs-mini-dialer
npm init -y
npm install @azure/communication-common --save
npm install @azure/communication-calling --save
npm install @azure/communication-identity --save
npm install parcel --save-dev
```

# ACS connection string


An ACS resource must be used to make the call to a phone number. Retrieve the connection string of the ACS resource to use.

### Option 1

Via Azure Portal

### Option 2

```
apt install jq

ACS_SUBSCRIPTION="Azure Communication Services"
RG=nuance-test-rg
ACS=nuance-test-acs

az communication list-key --name $ACS --resource-group $RG --subscription "$ACS_SUBSCRIPTION")

ACS_CONNECTION_STRING=$(echo $OUT | jq -r '.primaryConnectionString')

echo $ACS_CONNECTION_STRING
```

# Set environment

```
export ACS_CONNECTION_STRING="ACS connection string"
export ACS_SOURCE_PHONE_NUMBER="ACS registered phone number: +12223334444"
export DESTINATION_PHONE_NUMBER="+12223334444"
```

# Run

```
npx parcel index.html
```

# Use

1. Submit token
2. Start Call
3. Hang Up

# Debug in vscode

https://parceljs.org/recipes/debugging/

Sample launch.json
```
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "chrome",
            "request": "launch",
            "name": "Launch app in Chrome",
            "url": "http://localhost:1234",
            "webRoot": "${workspaceFolder}",
            "sourceMapPathOverrides": {
                "/__parcel_source_root/*": "${webRoot}/*"
            }
        }
    ]
}
```
