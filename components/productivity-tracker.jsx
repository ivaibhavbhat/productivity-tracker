"use client";
import { useState } from "react"
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from "chart.js"
import { Bar, Pie } from "react-chartjs-2"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title)

export function ProductivityTracker() {
  const [activities, setActivities] = useState([])
  const [date, setDate] = useState("''")
  const [coding, setCoding] = useState("''")
  const [productivity, setProductivity] = useState("''")

  const handleSubmit = (e) => {
    e.preventDefault()
    const newActivity = {
      date,
      coding: Number(coding),
      productivity: Number(productivity)
    }
    setActivities([...activities, newActivity])
    setDate("''")
    setCoding("''")
    setProductivity("''")
  }

  const barChartData = {
    labels: activities.map(a => a.date),
    datasets: [
      {
        label: "'Coding Hours'",
        data: activities.map(a => a.coding),
        backgroundColor: "'rgba(75, 192, 0.6)'",
      },
      {
        label: "'Productivity Hours'",
        data: activities.map(a => a.productivity),
        backgroundColor: "'rgba(153, 102, 255, 0.6)'",
      },
    ],
  }

  const pieChartData = {
    labels: ["'Coding'", "'Other Productivity'"],
    datasets: [
      {
        data: [
          activities.reduce((sum, a) => sum + a.coding, 0),
          activities.reduce((sum, a) => sum + a.productivity, 0) - activities.reduce((sum, a) => sum + a.coding, 0),
        ],
        backgroundColor: ["'rgba(75, 192, 0.6)'", "'rgba(153, 102, 255, 0.6)'"],
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  }

  return (
    (<div className="container mx-auto p-4 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Productivity Tracker</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required />
            </div>
            <div>
              <Label htmlFor="coding">Coding Hours</Label>
              <Input
                id="coding"
                type="number"
                value={coding}
                onChange={(e) => setCoding(e.target.value)}
                required
                min="0"
                step="0.5" />
            </div>
            <div>
              <Label htmlFor="productivity">Total Productivity Hours</Label>
              <Input
                id="productivity"
                type="number"
                value={productivity}
                onChange={(e) => setProductivity(e.target.value)}
                required
                min="0"
                step="0.5" />
            </div>
            <Button type="submit">Add Activity</Button>
          </form>
        </CardContent>
      </Card>
      {activities.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activities.map((activity, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{activity.date}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Coding Hours: {activity.coding}</p>
                  <p>Total Productivity: {activity.productivity}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Daily Activity</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <Bar data={barChartData} options={chartOptions} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Overall Productivity Distribution</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <Pie data={pieChartData} options={chartOptions} />
            </CardContent>
          </Card>
        </>
      )}
    </div>)
  );
}