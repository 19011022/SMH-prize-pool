import { FC,useEffect,useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export const ChangeGameForm:  FC = () => {
  const [formValues, setFormValues] = useState({
    creatorShare: '',
    entryFee: '',
    losePay: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Create a Game object
    const game = {
      creatorShare: parseFloat(formValues.creatorShare),
      entryFee: parseFloat(formValues.entryFee),
      losePay: formValues.losePay ? parseFloat(formValues.losePay) : null
    };

    // Do something with the game object (e.g., save to state or send to server)
    console.log(game);

    // Save the game object to local storage
    localStorage.setItem('game', JSON.stringify(game));
    console.log('Game saved:', game);
  };


  return (
    <form onSubmit={handleFormSubmit}>
    <div className="row">
      <div className="col-md-4 mb-3">
        <label htmlFor="creatorShare" className="form-label text-danger">Creator Share (Required)</label>
        <input
          type="number"
          className="form-control"
          id="creatorShare"
          name="creatorShare"
          value={formValues.creatorShare}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="col-md-4 mb-3">
        <label htmlFor="entryFee" className="form-label text-danger">Entry Fee (Required)</label>
        <input
          type="number"
          className="form-control"
          id="entryFee"
          name="entryFee"
          value={formValues.entryFee}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="col-md-4 mb-3">
        <label htmlFor="losePay" className="form-label text-danger">Lose Pay (Optional)</label>
        <input
          type="number"
          className="form-control"
          id="losePay"
          name="losePay"
          value={formValues.losePay}
          onChange={handleInputChange}
        />
      </div>
    </div>
    <button type="submit" className="btn btn-primary">Save</button>
  </form>

  );
}