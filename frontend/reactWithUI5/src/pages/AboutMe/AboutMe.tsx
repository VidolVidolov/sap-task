import {
  FormGroup,
  FormItem,
  Label,
  Page,
  Form,
  TextArea,
  Select,
  Option,
  Ui5CustomEvent,
  SelectDomRef,
  Input,
  InputDomRef,
  Button,
} from "@ui5/webcomponents-react";
import "./AboutMe.css";
import { useApi } from "../../hooks/useApi";
import { useState } from "react";
import { SelectChangeEventDetail } from "@ui5/webcomponents/dist/Select.js";
import { requester } from "../../requester";
import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";

export const AboutMe = () => {
  const { data, loading } = useApi<{ [key: string]: string }>();
  const { data: content, loading: loadingContnet } = useApi<{
    [key: string]: string;
  }>("/people");

  const [contentState, setContentState] = useState(content);
  const [form, setForm] = useState<{ [key: string]: string | number }>({
    attribute: "people",
    id: 1,
  });
  const [dataToShow, setDataToShow] = useState<{
    [key: string]: string | number;
  }>();

  //not a good practice to put any as type but time pressures...
  const handleChangeSelect = async (
    event:
      | Ui5CustomEvent<SelectDomRef, SelectChangeEventDetail>
      | Ui5CustomEvent<InputDomRef, never>
  ) => {
    const res = await requester(`/${event.target.value}`, { method: "GET" });

    setContentState(res as any);

    setForm((curr) => ({ ...curr, [event.target.name]: event.target.value }));
  };
  const handleInput = (event: Ui5CustomEvent<InputDomRef, never>) => {
    setForm((curr) => ({ ...curr, [event.target.name]: event.target.value }));
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await requester(
        `${form.attribute}/${form.id ? form.id : null}`,
        { method: "GET" }
      );

      setDataToShow(res as typeof dataToShow);
    } catch (error: { error: string }) {
      setDataToShow({ error: error.message } as typeof dataToShow);
    }
  };

  if (loading || loadingContnet || !data || !content) {
    return <>...Loading</>;
  }
  console.log(form);

  return (
    <Page
      header={
        <h1 className="about-me">
          About <span className="crossed">You</span> me
        </h1>
      }
    >
      <div className="inner-page-wrapper">
        <div className="useless-info">
          <div>
            I do not know if there is anything more to be said, but my hobbies
            are cars, motorcycles, snowboarding and watching movies.
          </div>
          <div className="name-of-attribute">
            NAME: {dataToShow?.name ?? "NO CONTENT"}
          </div>
          <div className="name-of-attribute">
            TITLE (if its film): {dataToShow?.title ?? "NO CONTENT"}
          </div>
        </div>
        <div className="star-wars-form-wrapper">
          <div>
            Below is a simple form for api call for STAR WARS info, if you are
            into that kind of stuff. <br /> NOTE!! The API is inconsistent with
            the ids, please try random ones, for vehicles and starships
          </div>
          <Form onSubmit={handleFormSubmit}>
            <FormGroup titleText="Star wars form:">
              <FormItem label={<Label>Thing you want to check</Label>}>
                <Select onChange={handleChangeSelect} name="attribute">
                  {Object.keys(data).map((attr) => (
                    <Option key={attr}>{attr}</Option>
                  ))}
                </Select>
              </FormItem>
              <FormItem
                label={
                  <Label>
                    {form.attribute} ID (MAX ID {contentState?.count ?? 82})
                  </Label>
                }
              >
                <Input
                  type="Number"
                  onChange={handleInput}
                  value={form.id.toString()}
                  name="id"
                />
              </FormItem>
            </FormGroup>
            <Button type="Submit" className="submit-button">
              Submit
            </Button>
          </Form>
        </div>
      </div>
      <Label for="response" className="label-for-response">
        Response
      </Label>
      <TextArea
        value={JSON.stringify(dataToShow)}
        className="text-area-star-wars"
        id="response"
      />
    </Page>
  );
};
