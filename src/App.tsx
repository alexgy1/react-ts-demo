import React, { ReactNode, useEffect, useState } from 'react';
import './App.css';

interface RootObject {
  Name: string;
  Age: string;
  Hobby: string;
}

const Heading: React.FC<{
  title: string;
}> = ({ title }) => <h1>{title} </h1>;

function HeadingWithElement({ title }: { title: ReactNode }) {
  return <h1>{title}</h1>;
}

function Dialog({
  header,
  children,
}: {
  header?: () => ReactNode;
  children: () => ReactNode;
}) {
  return (
    <div>
      {header && <div> {header?.()}</div>}
      {/* <div>{children}</div> */}
      <div>{children()}</div>
    </div>
  );
}
function List<ListItem>({
  items,
  render,
}: {
  items: ListItem[];
  render: (item: ListItem) => ReactNode;
}) {
  return (
    <ul>
      {items.map((item, index) => {
        return <li key={index}>{render(item)}</li>;
      })}
    </ul>
  );
}
// function Heading({ title }: { title: string }) {
//   return <h1>{title}</h1>;
// }
function App() {
  // add generic
  const [data, setData] = useState<RootObject[] | null>(null);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data: RootObject[]) => setData(data));
  }, []);
  return (
    <div className="app">
      <Heading title="hello world" />
      <HeadingWithElement title={<div> something element </div>} />
      <HeadingWithElement title="text" />

      <Dialog header={() => <div> header </div>}>
        {() => 'this would be the content from function'}
      </Dialog>

      <List
        items={[1, 2, 3]}
        render={(item: number) => <div> `Number is : {item} `</div>}
      />

      <List
        items={['foo', 'bar', 'baz']}
        render={(item: string) => <div> `String is : {item} `</div>}
      />

      {data && (
        <List
          items={data}
          render={(item: RootObject) => <div> `Name is : {item.Age} `</div>}
        />
      )}
    </div>
  );
}

export default App;
