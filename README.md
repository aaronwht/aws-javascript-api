# Depoly Node.js to AWS


[Download DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html)

After downloading DynamoDB and copying the files to a folder, run the below command (from that folder location) to start DynamoDB locally:

java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb