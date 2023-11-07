using System;
using System.Collections.Generic;

namespace MVPOnboardingCeline.Models;

public partial class Customer
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Address { get; set; }
}
