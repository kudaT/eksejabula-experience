
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const SizeGuide = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <Helmet>
        <title>Size Guide | Eksejabula</title>
      </Helmet>
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-display font-medium mb-6">Size Guide</h1>
        <p className="text-muted-foreground mb-8 max-w-3xl">
          Find your perfect fit with our detailed size charts. Our measurements are provided in centimeters.
        </p>
        
        <Tabs defaultValue="jerseys" className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-6">
            <TabsTrigger value="jerseys">Jerseys</TabsTrigger>
            <TabsTrigger value="beanies">Beanies</TabsTrigger>
            <TabsTrigger value="howtomeasure">How to Measure</TabsTrigger>
          </TabsList>
          
          <TabsContent value="jerseys">
            <Card>
              <CardHeader>
                <CardTitle>Jersey Size Chart</CardTitle>
                <CardDescription>All measurements are in centimeters</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Size</TableHead>
                        <TableHead>Chest</TableHead>
                        <TableHead>Waist</TableHead>
                        <TableHead>Hip</TableHead>
                        <TableHead>Sleeve Length</TableHead>
                        <TableHead>Body Length</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">XS</TableCell>
                        <TableCell>86-91</TableCell>
                        <TableCell>71-76</TableCell>
                        <TableCell>86-91</TableCell>
                        <TableCell>61</TableCell>
                        <TableCell>66</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">S</TableCell>
                        <TableCell>91-97</TableCell>
                        <TableCell>76-81</TableCell>
                        <TableCell>91-97</TableCell>
                        <TableCell>63</TableCell>
                        <TableCell>68</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">M</TableCell>
                        <TableCell>97-102</TableCell>
                        <TableCell>81-86</TableCell>
                        <TableCell>97-102</TableCell>
                        <TableCell>65</TableCell>
                        <TableCell>70</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">L</TableCell>
                        <TableCell>102-107</TableCell>
                        <TableCell>86-91</TableCell>
                        <TableCell>102-107</TableCell>
                        <TableCell>67</TableCell>
                        <TableCell>72</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">XL</TableCell>
                        <TableCell>107-112</TableCell>
                        <TableCell>91-97</TableCell>
                        <TableCell>107-112</TableCell>
                        <TableCell>69</TableCell>
                        <TableCell>74</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">XXL</TableCell>
                        <TableCell>112-118</TableCell>
                        <TableCell>97-102</TableCell>
                        <TableCell>112-118</TableCell>
                        <TableCell>71</TableCell>
                        <TableCell>76</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                
                <div className="mt-6 space-y-4">
                  <h3 className="font-medium">Jersey Fit Guide</h3>
                  <p className="text-muted-foreground">
                    Our jerseys are designed with a regular fit that provides a comfortable, relaxed silhouette.
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    <li><strong>Slim Fit:</strong> Size down for a closer, more tailored fit</li>
                    <li><strong>Regular Fit:</strong> Choose your normal size</li>
                    <li><strong>Loose Fit:</strong> Size up for a more relaxed, oversized look</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="beanies">
            <Card>
              <CardHeader>
                <CardTitle>Beanie Size Chart</CardTitle>
                <CardDescription>Coming soon</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
                    <span className="text-2xl">🧢</span>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Our Beanie Collection is Coming Soon</h3>
                  <p className="text-muted-foreground max-w-md">
                    We're working on bringing you premium quality beanies with our unique designs. 
                    Size information will be available when the collection launches.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="howtomeasure">
            <Card>
              <CardHeader>
                <CardTitle>How to Measure Yourself</CardTitle>
                <CardDescription>For the most accurate fit</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium text-lg mb-2">What You'll Need</h3>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>A flexible measuring tape</li>
                    <li>A friend to help (recommended)</li>
                    <li>Fitted clothing (for more accurate measurements)</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-2">Chest Measurement</h3>
                  <p className="text-muted-foreground">
                    Measure around the fullest part of your chest, keeping the tape horizontal and snug but not tight.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-2">Waist Measurement</h3>
                  <p className="text-muted-foreground">
                    Measure around your natural waistline, which is typically the narrowest part of your waist.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-2">Hip Measurement</h3>
                  <p className="text-muted-foreground">
                    Measure around the fullest part of your hips, keeping the tape horizontal.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-2">Sleeve Length</h3>
                  <p className="text-muted-foreground">
                    Measure from the center back of your neck, across your shoulder, and down to your wrist.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-2">Body Length</h3>
                  <p className="text-muted-foreground">
                    Measure from the highest point of your shoulder to the bottom hem where you want the jersey to end.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-2">Tips for Accurate Measurements</h3>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>Stand naturally with arms relaxed at your sides</li>
                    <li>Wear fitted clothing or measure directly over your skin</li>
                    <li>Keep the measuring tape snug but not tight</li>
                    <li>Measure twice for accuracy</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <p className="mt-8 text-center text-muted-foreground">
          Still unsure about sizing? <a href="/contact" className="underline font-medium">Contact our support team</a> for assistance.
        </p>
      </div>
    </div>
  );
};

export default SizeGuide;
