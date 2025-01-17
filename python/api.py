from flask import Flask, jsonify, request
import numpy as np
import pandas as pd
from datetime import datetime, timedelta

from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

@app.route("/")
def home():
    return "Hello, Flask!"

@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    return response

@app.route('/btc/prediction', methods=['GET'])
def get_btc_prediction():
    # Load historical data (adjust file path and column name as needed)
    data = pd.read_csv('btc_data_hourly.csv')  # Replace with your CSV file
    prices = data['Close']  # Replace 'Close' with the name of the price column

    # Calculate log returns
    log_returns = np.log(prices / prices.shift(1)).dropna()

    # Monte Carlo simulation parameters
    num_scenarios = 5  # Number of simulations
    days_to_forecast = 5 * 365  # Forecast duration in days (5 years)

    # Calculate statistical parameters of log returns
    mean_return = log_returns.mean()
    std_deviation = log_returns.std()

    # Initialize response
    response = {}

    # Run simulations for each scenario
    for scenario_num in range(1, num_scenarios + 1):
        scenario_name = f'scenario{scenario_num}'
        price_series = [prices.iloc[-1]]  # Start from the last observed price
        dates = [datetime.now() + timedelta(days=i) for i in range(days_to_forecast)]

        # Generate prices
        for _ in range(days_to_forecast - 1):
            next_log_return = np.random.normal(mean_return, std_deviation)  # Generate random log return
            next_price = price_series[-1] * np.exp(next_log_return)  # Calculate next price using log returns
            price_series.append(next_price)

        # Prepare scenario data
        scenario_data = [{"date": date.strftime("%Y-%m-%d"), "price": round(price, 2)}
                         for date, price in zip(dates, price_series)]
        
        # Add to response
        response[scenario_name] = scenario_data

    return jsonify(response)

@app.route('/btc/history', methods=['GET'])
def get_btc_history():
    # Load historical data (adjust file path and column name as needed)
    data = pd.read_csv('btc_data_hourly.csv')  # Replace with your CSV file


    result = [{"date": row['Date'], "price": row['Close']} for _, row in data.iterrows()]

    return jsonify(result)

@app.route('/sp500/prediction', methods=['GET'])
def get_sp500_prediction():
    # Load historical data (adjust file path and column name as needed)
    data = pd.read_csv('sp500_historical_data.csv')  # Replace with your CSV file
    prices = data['Close']  # Replace 'Close' with the name of the price column

    # Calculate log returns
    log_returns = np.log(prices / prices.shift(1)).dropna()

    # Monte Carlo simulation parameters
    num_scenarios = 5  # Number of scenarios
    days_to_forecast = 5 * 365  # Forecast duration in days (5 years)

    # Calculate statistical parameters of log returns
    mean_return = log_returns.mean()
    std_deviation = log_returns.std()

    # Initialize response dictionary
    response = {}

    # Run simulations for each scenario
    for scenario_num in range(1, num_scenarios + 1):
        scenario_name = f'scenario{scenario_num}'
        price_series = [prices.iloc[-1]]  # Start from the last observed price
        dates = [datetime.now() + timedelta(days=i) for i in range(days_to_forecast)]

        # Generate prices
        for _ in range(days_to_forecast - 1):
            next_log_return = np.random.normal(mean_return, std_deviation)  # Generate random log return
            next_price = price_series[-1] * np.exp(next_log_return)  # Calculate next price using log returns
            price_series.append(next_price)

        # Prepare scenario data
        scenario_data = [{"date": date.strftime("%Y-%m-%d"), "price": round(price, 2)}
                         for date, price in zip(dates, price_series)]
        
        # Add to response
        response[scenario_name] = scenario_data

    return jsonify(response)

@app.route('/sp500/history', methods=['GET'])
def get_sp500_history():
    # Load historical data (adjust file path and column name as needed)
    data = pd.read_csv('sp500_historical_data.csv')  # Replace with your CSV file


    result = [{"date": row['Date'], "price": row['Close']} for _, row in data.iterrows()]

    return jsonify(result)

if __name__ == '__main__':
    app.run(port=5000, debug=True)