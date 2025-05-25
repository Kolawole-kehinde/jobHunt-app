
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { InputField } from '../applyJobInputs';


const ApplyFormFields = ({ form, handleChange, handlePhoneChange }) => (
  <>
    <InputField
      id="firstName"
      name="firstName"
      label="First name"
      value={form.firstName}
      onChange={handleChange}
    />

    <InputField
      id="lastName"
      name="lastName"
      label="Last name"
      value={form.lastName}
      onChange={handleChange}
    />

    <div>
      <label className="block text-sm font-medium mb-1">Email</label>
      <div className="flex justify-between items-center">
        <span>{form.email}</span>
        <span title="Email can’t be changed" className="text-blue-500 cursor-pointer">ℹ️</span>
      </div>
    </div>

    <div>
      <label className="block text-sm font-medium mb-1">Country</label>
      <div className="flex justify-between items-center">
        <span>{form.country}</span>
        <span className="text-blue-600 text-sm font-medium cursor-pointer">Change</span>
      </div>
    </div>

    <InputField
      id="city"
      name="city"
      label="City"
      value={form.city}
      onChange={handleChange}
    />

    <div>
      <label className="block text-sm font-medium mb-1">Phone number</label>
      <PhoneInput
        country="ng"
        value={form.phone}
        onChange={handlePhoneChange}
        inputClass="!w-full !pl-14 !py-2 !border !rounded-2xl !border-2 !py-7"
        buttonClass="!border-r"
        inputStyle={{ borderRadius: '1rem' }}
      />
    </div>
  </>
);

export default ApplyFormFields;
