import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

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

print(data)
print(simulation_results)
# Plot results
plt.figure(figsize=(12, 6))
plt.plot(range(len(prices)), prices, color='black', label='Historical Data')  # Plot historical data
plt.plot(range(len(prices), len(prices) + hours_to_forecast), simulation_results, color='lightblue', alpha=0.5)  # Plot simulations
plt.title('Monte Carlo Simulation for Bitcoin Price Forecasting (5 Years)')
plt.xlabel('Hour')
plt.ylabel('Price')
plt.legend()
plt.grid()
plt.show()

# Save results to a CSV file
simulated_prices = pd.DataFrame(simulation_results, columns=[f'Simulation {i+1}' for i in range(num_simulations)])
simulated_prices.to_csv('monte_carlo_simulations_5_years_hourly.csv', index=False)