import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NextPage } from 'next';

const Home: NextPage = (props) => {
  const [formValues, setFormValues] = useState({
    input1: '',
    input2: '',
    input3: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const game = {
      input1: parseFloat(formValues.input1),
      input2: parseFloat(formValues.input2),
      input3: formValues.input3 ? parseFloat(formValues.input3) : null
    };

    localStorage.setItem('game', JSON.stringify(game));
    console.log('Game saved:', game);
  };

  const generatePairKey = () => {
    // Implement generatePublicKey using web3.js
    const publicKey = generatePublicKey(); // Replace with actual implementation

    const publicKeys = JSON.parse(localStorage.getItem('publicKeys') || '[]');
    publicKeys.push(publicKey);
    localStorage.setItem('publicKeys', JSON.stringify(publicKeys));
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleFormSubmit}>
        <div className="row">
          <div className="col-md-4 mb-3">
            <label htmlFor="input1" className="form-label">Input 1 (Required)</label>
            <input
              type="number"
              className="form-control"
              id="input1"
              name="input1"
              value={formValues.input1}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="input2" className="form-label">Input 2 (Required)</label>
            <input
              type="number"
              className="form-control"
              id="input2"
              name="input2"
              value={formValues.input2}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="input3" className="form-label">Input 3 (Optional)</label>
            <input
              type="number"
              className="form-control"
              id="input3"
              name="input3"
              value={formValues.input3}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>

      <div className="mt-5">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Public Keys</th>
              </tr>
            </thead>
            <tbody>
              {JSON.parse(localStorage.getItem('publicKeys') || '[]').map((key: string, index: number) => (
                <tr key={index}>
                  <td>{key}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3">
          <button className="btn btn-success" onClick={generatePairKey}>Generate Pair Key</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
