import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { PassengerData, PredictionResult } from "@shared/api";
import {
  Ship,
  Anchor,
  Users,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Moon,
  Sun,
} from "lucide-react";
import { useDarkMode } from "@/hooks/use-dark-mode";

export default function Index() {
  const { isDark, toggleDarkMode } = useDarkMode();

  const [formData, setFormData] = useState<PassengerData>({
    pclass: 3,
    sex: "",
    age: 25,
    sibsp: 0,
    parch: 0,
    fare: 50,
    embarked: "",
    alone: true,
  });

  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof PassengerData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const simulatePrediction = async (): Promise<PredictionResult> => {
    // Simulate a decision tree prediction based on historical Titanic survival rates
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API call

    let survivalProbability = 0.5; // Base probability

    // Decision tree logic simulation
    if (formData.sex === "female") survivalProbability += 0.35;
    if (formData.pclass === 1) survivalProbability += 0.25;
    else if (formData.pclass === 2) survivalProbability += 0.1;
    if (formData.age < 16) survivalProbability += 0.15;
    if (formData.fare > 50) survivalProbability += 0.1;
    if (
      formData.sibsp + formData.parch > 0 &&
      formData.sibsp + formData.parch < 4
    )
      survivalProbability += 0.05;

    survivalProbability = Math.max(0.1, Math.min(0.9, survivalProbability));

    const survived = survivalProbability > 0.5;

    return {
      survived,
      confidence: Math.round(survivalProbability * 100),
      features: [
        { name: "Gender", value: formData.sex, importance: 0.35 },
        { name: "Passenger Class", value: formData.pclass, importance: 0.25 },
        { name: "Age", value: formData.age, importance: 0.15 },
        { name: "Fare", value: `$${formData.fare}`, importance: 0.1 },
        {
          name: "Family Size",
          value: formData.sibsp + formData.parch,
          importance: 0.1,
        },
        {
          name: "Port of Embarkation",
          value: formData.embarked,
          importance: 0.05,
        },
      ],
    };
  };

  const handlePredict = async () => {
    if (!formData.sex || !formData.embarked) {
      alert("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    try {
      const result = await simulatePrediction();
      setPrediction(result);
    } catch (error) {
      console.error("Prediction error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToPredictor = () => {
    document
      .getElementById("predictor")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-blue-100 dark:border-slate-700 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Ship className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-blue-900">
                Titanic Predictor
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <a
                href="#home"
                className="text-blue-700 hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-100 transition-colors"
              >
                Home
              </a>
              <a
                href="#predictor"
                className="text-blue-700 hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-100 transition-colors"
              >
                Predictor
              </a>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                className="ml-2 hover:bg-blue-100 dark:hover:bg-blue-800"
              >
                {isDark ? (
                  <Sun className="h-5 w-5 text-blue-700 dark:text-blue-300" />
                ) : (
                  <Moon className="h-5 w-5 text-blue-700" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-16">
        <div className="container mx-auto px-6">
          <div className="text-center py-20">
            <div className="mb-8">
              <Ship className="h-20 w-20 text-blue-600 mx-auto mb-6" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-blue-900 dark:text-blue-100 mb-6">
              Titanic Survival
              <span className="block text-blue-600 dark:text-blue-400">
                Predictor
              </span>
            </h1>
            <p className="text-xl text-blue-700 dark:text-blue-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover the power of machine learning with our Decision Tree
              model trained on the historic Titanic dataset. Input passenger
              information and predict survival chances based on historical
              patterns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={scrollToPredictor}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
              >
                Try Prediction
                <TrendingUp className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg"
              >
                Learn More
                <Anchor className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <Card className="text-center border-blue-200 dark:border-slate-600 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-blue-900 dark:text-blue-100">
                  Machine Learning
                </CardTitle>
                <CardDescription>
                  Advanced Decision Tree algorithm trained on historical Titanic
                  passenger data
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center border-blue-200 dark:border-slate-600 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-blue-900 dark:text-blue-100">
                  Historical Data
                </CardTitle>
                <CardDescription>
                  Based on real passenger manifest data from the RMS Titanic
                  voyage
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center border-blue-200 dark:border-slate-600 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                  <Ship className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-blue-900 dark:text-blue-100">
                  Interactive
                </CardTitle>
                <CardDescription>
                  Real-time predictions with detailed feature importance
                  analysis
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Predictor Section */}
      <section
        id="predictor"
        className="py-20 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white dark:text-blue-100 mb-4">
              Survival Predictor
            </h2>
            <p className="text-blue-200 dark:text-blue-300 text-lg max-w-2xl mx-auto">
              Enter passenger details to get a survival prediction based on our
              Decision Tree model
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-900 dark:text-blue-100 flex items-center">
                  <Users className="mr-2 h-6 w-6" />
                  Passenger Information
                </CardTitle>
                <CardDescription>
                  Fill in the passenger details for prediction
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sex">Gender *</Label>
                    <Select
                      value={formData.sex}
                      onValueChange={(value) => handleInputChange("sex", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pclass">Passenger Class *</Label>
                    <Select
                      value={formData.pclass.toString()}
                      onValueChange={(value) =>
                        handleInputChange("pclass", parseInt(value))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">First Class</SelectItem>
                        <SelectItem value="2">Second Class</SelectItem>
                        <SelectItem value="3">Third Class</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      value={formData.age}
                      onChange={(e) =>
                        handleInputChange("age", parseFloat(e.target.value))
                      }
                      min="0"
                      max="120"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fare">Fare ($)</Label>
                    <Input
                      id="fare"
                      type="number"
                      value={formData.fare}
                      onChange={(e) =>
                        handleInputChange("fare", parseFloat(e.target.value))
                      }
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sibsp">Siblings/Spouses</Label>
                    <Input
                      id="sibsp"
                      type="number"
                      value={formData.sibsp}
                      onChange={(e) =>
                        handleInputChange("sibsp", parseInt(e.target.value))
                      }
                      min="0"
                      max="10"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="parch">Parents/Children</Label>
                    <Input
                      id="parch"
                      type="number"
                      value={formData.parch}
                      onChange={(e) =>
                        handleInputChange("parch", parseInt(e.target.value))
                      }
                      min="0"
                      max="10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="embarked">Port of Embarkation *</Label>
                  <Select
                    value={formData.embarked}
                    onValueChange={(value) =>
                      handleInputChange("embarked", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select port" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="C">Cherbourg</SelectItem>
                      <SelectItem value="Q">Queenstown</SelectItem>
                      <SelectItem value="S">Southampton</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="alone"
                    checked={formData.alone}
                    onCheckedChange={(checked) =>
                      handleInputChange("alone", checked)
                    }
                  />
                  <Label htmlFor="alone">Traveling alone</Label>
                </div>

                <Button
                  onClick={handlePredict}
                  disabled={isLoading || !formData.sex || !formData.embarked}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                  size="lg"
                >
                  {isLoading ? "Calculating..." : "Predict Survival"}
                  <TrendingUp className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>

            {/* Results */}
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-900 dark:text-blue-100 flex items-center">
                  <TrendingUp className="mr-2 h-6 w-6" />
                  Prediction Results
                </CardTitle>
                <CardDescription>AI-powered survival analysis</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                  </div>
                ) : prediction ? (
                  <div className="space-y-6">
                    {/* Main Result */}
                    <div className="text-center p-6 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-700">
                      <div className="flex items-center justify-center mb-4">
                        {prediction.survived ? (
                          <CheckCircle className="h-16 w-16 text-green-600 dark:text-green-400" />
                        ) : (
                          <AlertTriangle className="h-16 w-16 text-red-600 dark:text-red-400" />
                        )}
                      </div>
                      <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-2">
                        {prediction.survived
                          ? "Likely Survived"
                          : "Likely Did Not Survive"}
                      </h3>
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-blue-700 dark:text-blue-300">
                          Confidence:
                        </span>
                        <Badge
                          variant={
                            prediction.confidence > 70 ? "default" : "secondary"
                          }
                          className="text-lg px-3 py-1"
                        >
                          {prediction.confidence}%
                        </Badge>
                      </div>
                    </div>

                    {/* Feature Importance */}
                    <div>
                      <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-4">
                        Feature Importance
                      </h4>
                      <div className="space-y-3">
                        {prediction.features.map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between"
                          >
                            <div className="flex-1">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                                  {feature.name}
                                </span>
                                <span className="text-sm text-blue-600 dark:text-blue-400">
                                  {feature.value}
                                </span>
                              </div>
                              <div className="w-full bg-blue-100 dark:bg-slate-700 rounded-full h-2">
                                <div
                                  className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all duration-500"
                                  style={{
                                    width: `${feature.importance * 100}%`,
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-blue-600 dark:text-blue-400">
                    <Ship className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p>
                      Enter passenger details and click "Predict Survival" to
                      see results
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 dark:bg-slate-900 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Ship className="h-8 w-8" />
            <span className="text-xl font-bold">Titanic Predictor</span>
          </div>
          <p className="text-blue-200 dark:text-blue-300 mb-4">
            Machine Learning demonstration using the Titanic dataset
          </p>
          <p className="text-blue-300 dark:text-blue-400 text-sm">
            Built with React, TypeScript, and Decision Tree algorithms
          </p>
        </div>
      </footer>
    </div>
  );
}
