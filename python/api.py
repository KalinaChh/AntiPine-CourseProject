from flask import Flask, jsonify, request
import numpy as np
import pandas as pd

app = Flask(__name__)


@app.route("/")
def home():
    return "Hello, Flask!"

@app.route('/btc/prediction', methods=['GET'])
def get_btc_prediction():
    # Load historical data (adjust file path and column name as needed)
    data = pd.read_csv('btc_data_hourly.csv')  # Replace with your CSV file
    prices = data['Close']  # Replace 'Close' with the name of the price column

    # Calculate log returns
    log_returns = np.log(prices / prices.shift(1)).dropna()

    # Monte Carlo simulation parameters
    num_simulations = 5  # Number of simulations
    hours_to_forecast = 5 * 365 * 24  # Number of hours to forecast (5 years)

    # Calculate statistical parameters of log returns
    mean_return = log_returns.mean()
    std_deviation = log_returns.std()

    # Initialize an array to store simulation results
    simulation_results = np.zeros((hours_to_forecast, num_simulations))

    # Run simulations
    for sim in range(num_simulations):
        price_series = [prices.iloc[-1]]  # Start from the last observed price
        for _ in range(hours_to_forecast):
            next_log_return = np.random.normal(mean_return, std_deviation)  # Generate random log return
            next_price = price_series[-1] * np.exp(next_log_return)  # Calculate next price using log returns
            price_series.append(next_price)
        simulation_results[:, sim] = price_series[1:]  # Exclude the starting price


    result = {
        "predictions": simulation_results.tolist()
    }

    return jsonify(result)

@app.route('/btc/history', methods=['GET'])
def get_btc_history():
    # Load historical data (adjust file path and column name as needed)
    data = pd.read_csv('btc_data_hourly.csv')  # Replace with your CSV file


    result = {
        "history": data[['Date', 'Close']].to_dict(),
    }

    return jsonify(result)

@app.route('/sp500/prediction', methods=['GET'])
def get_sp500_prediction():
    # Load historical data (adjust file path and column name as needed)
    data = pd.read_csv('sp500_historical_data.csv')  # Replace with your CSV file
    prices = data['Close']  # Replace 'Close' with the name of the price column

    # Calculate log returns
    log_returns = np.log(prices / prices.shift(1)).dropna()

    # Monte Carlo simulation parameters
    num_simulations = 5  # Number of simulations
    hours_to_forecast = 5 * 365  # Number of hours to forecast (5 years)

    # Calculate statistical parameters of log returns
    mean_return = log_returns.mean()
    std_deviation = log_returns.std()

    # Initialize an array to store simulation results
    simulation_results = np.zeros((hours_to_forecast, num_simulations))

    # Run simulations
    for sim in range(num_simulations):
        price_series = [prices.iloc[-1]]  # Start from the last observed price
        for _ in range(hours_to_forecast):
            next_log_return = np.random.normal(mean_return, std_deviation)  # Generate random log return
            next_price = price_series[-1] * np.exp(next_log_return)  # Calculate next price using log returns
            price_series.append(next_price)
        simulation_results[:, sim] = price_series[1:]  # Exclude the starting price


    result = {
        "predictions": simulation_results.tolist()
    }

    return jsonify(result)

@app.route('/sp500/history', methods=['GET'])
def get_sp500_history():
    # Load historical data (adjust file path and column name as needed)
    data = pd.read_csv('sp500_historical_data.csv')  # Replace with your CSV file


    result = {
        "history": data[['Date', 'Close']].to_dict(),
    }

    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)