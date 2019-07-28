# Deploy Node.js to AWS

### Overview
The code in this repository is configured to deploy to AWS Elastic Beanstalk using AWS CodePipeline. The correlating client-side React code may be found at https://github.com/aaronwht/aws-javascript.  

[Contact me](https://www.aaronwht.com/contact-me) if you run into problems using this repo or tutorial.  

### Running locally
[Download AWS DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html) if you don't already have it and copy the deploy files into another folder, I suggest `/dynamodb`.
Run the below command from that folder's location to start DynamoDB locally - this will run on port 8080.

`java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb`


![Google Developer Key](https://www.aaronwht.com/images/elastic-beanstalk-build/dynamodb-locally.png)

Create an `.env` file in the root of your project.  As a convention, `.env` files store environment variables and are not checked into code repositories as they often include sensitive, or environment-related, information.  This is done by including the `.env` file in your `.gitignore` file, as done in this project.
![Env Variables](https://www.aaronwht.com/images/elastic-beanstalk-build/aws-javascript-api-env-variables.png)

To run this Node.js application locally you'll need the below things:
- A Google Developer API Key
- A Google Custom Search Engine Id (which requires a Google Project)

Obtain a Google Developer API Key by visiting https://console.cloud.google.com/apis/credentials.

If you don't already have a Google Project setup, visit https://console.developers.google.com/cloud-resource-manager to create one.

![Save Google Project](https://www.aaronwht.com/images/elastic-beanstalk-build/google-save-project.png)

This may take a minute or two and you may have to reload the page for it to display your new project.
![Google Project](https://www.aaronwht.com/images/elastic-beanstalk-build/google-project.png)

Once you have your `Google Developer Account` and a `Google Project` you can setup your `Google Custom search engine ID`, which you may obtain here https://cse.google.com/cse/all

Click the `Add` button, then enter `www.google.com` as the `Sites to search` and click the `CREATE` button at the bottom of the screen.  On the next screen click the `Control Panel` button.

Toggle the `Image search` and `SafeSearch` options along with the `Search the entire web` option as displayed below.

![Google Custom Search Engine](https://www.aaronwht.com/images/elastic-beanstalk-build/google-image-search.png)
 At the bottom of the screen enter `ImageObject` under the `Restrict Pages using Schema.org Types` header the click the `Update` button.  Now scroll up and copy your `Search engine ID` - which I have blurred out

Add the variables pictured below to your `.env` file:
![Env Variables](https://www.aaronwht.com/images/elastic-beanstalk-build/aws-javascript-api-env-variables.png)
`AWS_REGION` your region
`AWS_DYNAMODB_ENDPOINT` with the value ```http://localhost:8000```
`GOOGLE_API_KEY` use your Google API Developer Key
`GOOGLE_CSE` use your Google Custom search engine value

Running `node app` should run your project.
