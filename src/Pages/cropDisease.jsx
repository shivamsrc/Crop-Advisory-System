import { useState } from "react";
import { Upload, X } from "lucide-react";

export default function Disease() {
  const [file, setFile] = useState(null);
  const [showImage, setShowImage] = useState(false);
  const [prediction, setPrediction] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile({
        url: URL.createObjectURL(selectedFile),
        name: selectedFile.name,
        size: (selectedFile.size / 1024).toFixed(1) + "KB",
      });
      setPrediction(null);
      setShowImage(false);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setShowImage(false);
    setPrediction(null);
  };

  const handlePredict = () => {
    setPrediction("Model is Predicting it's a Tomato___Tomato_Yellow_Leaf_Curl_Virus");
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Disease Recognition</h1>

      {/* upload file */}
      <div className=" flex justify-between border-2 border-dashed border-gray-300 rounded-lg p-10 text-center bg-white">
        <div className="flex flex-row">
            <div className="mr-5">
                <Upload className="w-12 h-12 mx-auto text-gray-400" />
            </div>
            <div>
                <p className="text-gray-600 mt-2 text-lg">Drag and drop file here</p>
                <p className="text-gray-400 text-sm">Limit: 10MB per file</p>
            </div>
        </div>

        <div>
        <input
          type="file"
          id="fileInput"
          onChange={handleFileChange}
          className="hidden"
        />
        <label
          htmlFor="fileInput"
          className="inline-block mt-4 px-5 py-2 bg-emerald-600 text-white text-base rounded-lg hover:bg-emerald-700 cursor-pointer"
        >
          Browse files
        </label>
        </div>
      </div>

      {/* file info */}
      {file && (
        <div className="flex items-center justify-between bg-gray-100 p-4 mt-6 rounded-lg shadow-sm">
          <div>
            <p className="text-base font-medium">{file.name}</p>
            <p className="text-sm text-gray-500">{file.size}</p>
          </div>
          <button
            onClick={handleRemoveFile}
            className="text-gray-400 hover:text-red-500"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Actions */}
      {file && (
        <div className="mt-6 flex flex-col items-center gap-4">
          <button
            onClick={() => setShowImage((prev) => !prev)}
            className="px-5 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
          >
            {showImage ? "Hide Image" : "Show Image"}
          </button>

          {showImage && (
            <img
              src={file.url}
              alt="Preview"
              className="w-full max-w-lg h-auto object-cover rounded-lg border shadow-md"
            />
          )}

          <button
            onClick={handlePredict}
            className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Predict
          </button>
        </div>
      )}

      {/* Prediction */}
      {prediction && (
        <div className="mt-8">
          <p className="text-lg font-semibold mb-2">Our Prediction</p>
          <div className="bg-green-100 border border-green-300 text-green-700 p-4 rounded-lg text-base">
            {prediction}
          </div>
        </div>
      )}
    </div>
  );
}
