# Depoly Node.js to AWS


[Download DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html)

After downloading DynamoDB and copying the files to a folder (I suggest at /dynamodb), run the below command (from that folder location) to start DynamoDB locally - this will run 
on port `8080`:

java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb