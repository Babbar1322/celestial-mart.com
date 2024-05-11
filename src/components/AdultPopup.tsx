import { ChangeEvent, useRef, useState } from 'react';
import Button from './Button';
import Typography from './Typography';

const AdultPopup = () => {
    const checkRef = useRef<HTMLInputElement>(null);
    const divRef = useRef<HTMLDivElement>(null);
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
    // console.log(checkRef.current?.checked);
    const handleCheck = (event: ChangeEvent<HTMLInputElement>) => {
        setButtonDisabled(!event.target.checked);
    }

    const handleClick = () => {
        if (!checkRef.current?.checked) {
            setButtonDisabled(!checkRef.current?.checked);
            return;
        }
        localStorage.setItem('18+', JSON.stringify(true));
        console.log(divRef.current?.style.display)
        if (divRef.current) {
            divRef.current.classList.remove('position-fixed', 'd-flex', 'justify-content-center', 'align-items-center')
            divRef.current.classList.add('d-none')
            // divRef.current.style.display = 'none';
        }
    }
    return (
        <div
            className="bg-dark min-vh-100 min-vw-100 position-fixed d-flex justify-content-center align-items-center"
            style={{ zIndex: 9999999 }}
            ref={divRef}
        >
            <div className="w-100 w-md-50 mx-auto bg-white px-3 py-2 rounded-3">
                <div className="modal-content">
                    <div className="bg-warning-subtle rounded py-2 px-3">
                        <h1 className="modal-title fs-5 text-center" id="warningModalLabel">
                            🚧 Warning
                        </h1>
                        {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                    </div>
                    <div className="modal-body">
                        <Typography fontSize={2} fontWeight="semibold" center marginVertical="4">
                            Confirm that You are 18+
                        </Typography>
                        <div className="d-flex align-items-center justify-content-center">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="flexCheckDefault" onChange={handleCheck} ref={checkRef} />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    I've read and agree with Privacy and Policy
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer mt-5">
                        <Button type="button" disabled={buttonDisabled} onClick={handleClick}>Confirm</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdultPopup;
