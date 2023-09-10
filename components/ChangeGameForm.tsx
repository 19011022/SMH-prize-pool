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
        <div className='col-10 col-md-6 offset-1'>
          <div className='row'>
           <div className="input-group mb-3 ">
            <span className="input-group-text bg-secondary text-white border-0 fw-bolder">Creator Share<span className='text-danger'>*</span></span>
            <input
              type="number"
              className="form-control bg-dark text-white border-0 fw-bolder"
              id="creatorShare"
              name="creatorShare"
              value={formValues.creatorShare}
              onChange={handleInputChange}
              required
            />
          </div>
      <div className="input-group mb-3">
        <div className="input-group-text bg-secondary text-white border-0 fw-bolder">Entry Fee
          <span className='text-danger'>*</span>
        </div>
        <input
          type="number"
          className="form-control bg-dark border-0 text-white fw-bolder"
          id="entryFee"
          name="entryFee"
          value={formValues.entryFee}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="input-group" >
        <span className="input-group-text bg-secondary text-white border-0 fw-bolder">Lose Pay</span>
        <input
          type="number"
          className="form-control bg-dark border-0 text-white fw-bolder"
          id="losePay"
          name="losePay"
          value={formValues.losePay}
          onChange={handleInputChange}
        />
      </div>
      <div className='col-6 offset-3 mt-3'>
        <button type="submit" className="btn btn-primary text-white fw-bolder text-center w-100">Set Room</button>
      </div>
          </div>
        </div>
      </div>    
  </form>

  );
}