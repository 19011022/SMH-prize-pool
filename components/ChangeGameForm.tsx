import { FC,useEffect,useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export const ChangeGameForm:  FC = () => {
  const [currCreatorShare,setCurrCreatorShare] = useState<number>()
  const [currEntryFee,setCurrEntryFee] = useState<number>()
  const [currLosePay,setCurrLosePay] = useState<number>()
  
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

    setCurrCreatorShare(parseFloat(formValues.creatorShare));
    setCurrEntryFee(parseFloat(formValues.entryFee));
    setCurrLosePay(parseFloat(formValues.losePay));

    // Do something with the game object (e.g., save to state or send to server)
    console.log(game);

    // Save the game object to local storage
    localStorage.setItem('game', JSON.stringify(game));
    console.log('Game saved:', game);

  };
  // Load initial values from local storage when component mounts
  useEffect(() => {
    const savedGame = JSON.parse(localStorage.getItem('game'));
    if (savedGame) {
      setCurrCreatorShare(savedGame.creatorShare);
      setCurrEntryFee(savedGame.entryFee);
      setCurrLosePay(savedGame.losePay);
    }
  }, []);

  return (
    <form onSubmit={handleFormSubmit}>
      <div className='row offset-md-4'>
        <div className='col-12 col-md-6'>
          <div className='row'>
          <div className="col-12 mb-3 text-center 0">
            <label htmlFor="creatorShare" className="form-label text-white">Creator Share (Required)</label>
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
      <div className="col-12 mb-3 text-center">
        <label htmlFor="entryFee" className="form-label text-white">Entry Fee (Required)</label>
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
      <div className="col-12 mb-3 text-center" >
        <label htmlFor="losePay" className="form-label text-white">Lose Pay (Optional)</label>
        <input
          type="number"
          className="form-control"
          id="losePay"
          name="losePay"
          value={formValues.losePay}
          onChange={handleInputChange}
        />
      </div>
      <div className='col-4 offset-4'>
        <button type="submit" className="btn btn-primary text-center w-100">Save</button>
      </div>
          </div>
        </div>
      </div>    
  </form>

  );
}