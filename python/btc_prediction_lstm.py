import pandas
import numpy
import math
from sklearn.preprocessing import MinMaxScaler
from keras.models import Sequential
from keras.layers import Dense, LSTM
import matplotlib.pyplot as plt
plt.style.use('fivethirtyeight')

data = pandas.read_csv('btc_data_hourly.csv')
data.drop('Id', inplace=True, axis=1) 

# plt.figure(figsize=(16,8))
# plt.title('Close Price History')
# plt.xlabel('Date', fontsize=18)
# plt.ylabel('Close Price', fontsize=18)
# plt.plot(data['Close'])
# plt.show()

newData = data.filter(['Close'])
dataset = newData.values
datasetLen = math.ceil(len(dataset) * 0.8)

scaler = MinMaxScaler(feature_range=(0,1))
scaledData = scaler.fit_transform(dataset)

trainData = scaledData[0:datasetLen]
xTrain = []
yTrain = []

for i in range(60, len(trainData)):
    xTrain.append(trainData[i - 60:i, 0])
    yTrain.append(trainData[i, 0])

# Convert xTrain, yTrain into numpy arrays
xTrain = numpy.array(xTrain)
yTrain = numpy.array(yTrain)

# Reshape the data
xTrain = numpy.reshape(xTrain, (xTrain.shape[0], xTrain.shape[1], 1))

# Build the LSTM model
model = Sequential()
model.add(LSTM(50, return_sequences=True, input_shape=(xTrain.shape[1], 1)))
model.add(LSTM(50, return_sequences=False))
model.add(Dense(25))
model.add(Dense(1))

# Compile the model
model.compile(optimizer='adam', loss='mean_squared_error')

# Train
model.fit(xTrain, yTrain, batch_size=1, epochs=1)

# Create test data set
testData = scaledData[datasetLen - 60: , :]
xTest = []
yTest = dataset[datasetLen:,:]
for i in range(60, len(testData)):
        xTest.append(testData[i-60:i, 0])

# Convert into numpy arrays
xTest = numpy.array(xTest)

# Reshape data
xTest = numpy.reshape(xTest, (xTest.shape[0], xTest.shape[1], 1))

# Predictions
predictions = model.predict(xTest)
predictions = scaler.inverse_transform(predictions)

rmse = numpy.sqrt(numpy.mean(predictions - yTest)**2)

train = data[:datasetLen]
valid = data[datasetLen:]
valid['Predictions'] = predictions

plt.figure(figsize=(16,8))
plt.title('Model')
plt.xlabel('Date', fontsize=18)
plt.ylabel('Close Price', fontsize=18)
plt.plot(train['Close'])
plt.plot(valid[['Close', 'Predictions']])
plt.legend(['Train', 'Valid', 'Predictions'], loc='lower right')
plt.show()
