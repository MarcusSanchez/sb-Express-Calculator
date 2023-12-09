const Express = require('express');

const app = Express();

app.get('/mean', (req, res) => {
  if (!req.query['nums']) {
    return res.status(400).send('nums are required');
  }
  let nums;

  try {
    nums = parseNums(req.query['nums'].split(','))
  } catch (err) {
    return res.status(400).send(err.message);
  }

  let mean = nums.reduce((acc, val) => acc + val) / nums.length;

  return res.status(200).send(
    {
      response: {
        operation: 'mean',
        value: mean
      }
    }
  );
});

app.get('/median', (req, res) => {
  if (!req.query['nums']) {
    res.status(400).send('nums are required');
  }
  let nums;

  try {
    nums = parseNums(req.query['nums'].split(','))
  } catch (err) {
    return res.status(400).send(err.message);
  }

  nums.sort((a, b) => a - b);
  let median = nums[Math.floor(nums.length / 2)];

  return res.status(200).send(
    {
      response: {
        operation: 'median',
        value: median
      }
    }
  );
});

app.get('/mode', (req, res) => {
  if (!req.query['nums']) {
    return res.status(400).send('nums are required');
  }
  let nums;

  try {
    nums = parseNums(req.query['nums'].split(','))
  } catch (err) {
    return res.status(400).send(err.message);
  }

  let counts = nums.reduce((acc, num) => {
    acc[num] = (acc[num] || 0) + 1;
    return acc;
  }, {});
  let maxCount = Math.max(...Object.values(counts));
  let mode = Object.keys(counts).find(key => counts[key] === maxCount);

  return res.status(200).send(
    {
      response: {
        operation: 'mode',
        value: mode
      }
    }
  );
});

const server = app.listen(3000, () => {
  console.log('App listening on http://localhost:3000');
});

function parseNums(nums) {
  let parsedNums = [];
  for (let num of nums) {
    let parsedNum = Number(num);
    if (isNaN(parsedNum)) {
      throw new Error(`${num} is not a number`);
    }
    parsedNums.push(parsedNum);
  }
  return parsedNums;
}

module.exports = { app, server };