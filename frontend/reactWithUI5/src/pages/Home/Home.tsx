import { List, Text, Page } from "@ui5/webcomponents-react";

import "./Home.css";

export const Home = () => {
  return (
    <Page header={<h1>This is my sample project with React and UI5</h1>}>
      <div className="inner-page-wrapper">
        <div>
          <Text>I really like the font above</Text>

          <h3>Below are some of the things I can contribute with</h3>
          <List className="home-list-item">1. Positive attitude</List>
          <List className="home-list-item">2. Team player</List>
          <List className="help-devs home-list-item">
            3. Always happy to help experienced and not so experienced devs
          </List>
          <List className="home-list-item">
            4. Would love to have a chat again regarding webui5
          </List>
        </div>
        <div className="dog-image-wrapper">
          <Text className="text-for-dog">Here is a pic of a dog</Text>
          <img
            src="https://img.freepik.com/free-photo/isolated-happy-smiling-dog-white-background-portrait-4_1562-693.jpg?t=st=1719335321~exp=1719338921~hmac=588fc13b2949d2719f85b538a30bbd66128e472c6eb1744c1f7927bb79a46fcc&w=1380"
            alt="some dog image"
            className="image-of-dog"
          />
        </div>
      </div>
    </Page>
  );
};
