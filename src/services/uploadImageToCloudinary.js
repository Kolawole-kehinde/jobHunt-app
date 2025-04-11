import axios from 'axios';

export const uploadImageToCloudinary = async (file) => {
  const cloudName = 'daarrcw3q'; // Cloudinary cloud name
  const uploadPreset = 'jobhunt'; // upload preset name

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  try {
    const response = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.secure_url; // Image URL
  } catch (error) {
    console.error('Upload failed:', error);
    return null;
  }
};
