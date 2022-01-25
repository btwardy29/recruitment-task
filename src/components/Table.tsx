interface Person {
  login: { uuid: string };
  name: { title: string, first: string, last: string };
  location: { city: string, country: string };
  dob: { age: number }
}

interface PeopleArray {
  oldest10: Person[]
}

const Table = ({ oldest10 }:PeopleArray) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>City</th>
          <th>Age</th>
        </tr>
      </thead>
      <tbody>
        {oldest10.map((person:Person) => {
          return (
            <tr key={person.login.uuid}>
              <td>{person.name.title} {person.name.first} {person.name.last}</td>
              <td>{person.location.city} {person.location.country}</td>
              <td>{person.dob.age}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
};

export default Table;
