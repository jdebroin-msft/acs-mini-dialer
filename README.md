Install
-------
```
cd ~/src/acs/calling-quickstart-voice
npm init -y
npm install @azure/communication-common --save
npm install @azure/communication-calling --save
npm install parcel --save-dev
```

Generate a token
----------------
```
apt install jq

ACS_SUBSCRIPTION="Azure Communication Services"
RG=nuance-test-rg
ACS=nuance-test-acs

OUT=$(az communication list-key --name $ACS --resource-group $RG --subscription "$ACS_SUBSCRIPTION")
CONNECTION_STRING=$(echo $OUT | jq -r '.primaryConnectionString')

OUT=$(az communication user-identity token issue --scope voip --connection-string $CONNECTION_STRING)
TOKEN=$(echo $OUT | jq -r '.token')
USERID=$(echo $OUT | jq -r '.user_id')
echo $TOKEN
echo $USERID
```

Add the token to token.json

Run
---
```
npx parcel index.html
```

Submit token

Start Call
