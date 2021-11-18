import React, { Fragment, useState, useEffect } from "react";
import "./ResetPassword.css";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../actions/user";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../../constants/user";
import MetaData from "../layout/MetaData";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";

const ResetPassword = ({match, history}) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const token = match.params.token;

  const {error, loading, success} = useSelector(state => state.forgotPassword)

  const [password, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(token, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success('Password Changed Successfully');

      history.push("/login");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, alert, success, history]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title='Change Password' />
          <div className='resetPasswordContainer'>
            <div className='resetPasswordBox'>
              <h2 className='resetPasswordHeading'>Update Profile</h2>

              <form
                className='resetPasswordForm'
                onSubmit={resetPasswordSubmit}
              >
                <div className='loginPassword'>
                  <LockOpenIcon />
                  <input
                    type='password'
                    placeholder='New Password'
                    required
                    value={password}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className='loginPassword'>
                  <LockIcon />
                  <input
                    type='password'
                    placeholder='Confirm Password'
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type='submit'
                  value='Reset'
                  className='resetPasswordBtn'
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ResetPassword;
