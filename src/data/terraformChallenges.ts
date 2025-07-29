import { Challenge } from './challenges';

export const terraformChallenges: Challenge[] = [
  {
    id: "terraform-101",
    title: "Your First Terraform Resource",
    description: "Create a simple Terraform configuration file that defines a local file resource",
    starterCode: `# main.tf
# TODO: Configure the Terraform version
# TODO: Create a local_file resource named "hello"
# TODO: Set content to "Hello, Terraform!"
# TODO: Set filename to "hello.txt"`,
    solutionCode: `# main.tf
terraform {
  required_version = ">= 1.0"
}

resource "local_file" "hello" {
  content  = "Hello, Terraform!"
  filename = "hello.txt"
}`,
    hints: [
      {
        message: "Resources are defined with 'resource' blocks"
      },
      {
        message: "The syntax is: resource \"type\" \"name\" { ... }",
        revealCode: `resource "local_file" "hello" {
  content  = "Hello, Terraform!"
}`
      }
    ],
    tests: [
      {
        description: "Should create a local file resource",
        input: null,
        expected: true
      }
    ],
    realm: "terraform",
    difficulty: "easy",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "terraform-102",
    title: "Variables and Outputs",
    description: "Define input variables and output values in Terraform",
    starterCode: `# variables.tf
# TODO: Define a variable "environment" with default "dev"
# TODO: Define a variable "app_name" with no default

# outputs.tf
# TODO: Output a value combining both variables`,
    solutionCode: `# variables.tf
variable "environment" {
  description = "The deployment environment"
  type        = string
  default     = "dev"
}

variable "app_name" {
  description = "The application name"
  type        = string
}

# outputs.tf
output "app_identifier" {
  value = "${var.app_name}-${var.environment}"
}`,
    hints: [
      {
        message: "Variables allow you to parameterize your configuration"
      },
      {
        message: "Use ${var.variable_name} to reference variables",
        revealCode: `variable "environment" {
  default = "dev"
}`
      }
    ],
    tests: [
      {
        description: "Should define variables and outputs correctly",
        input: null,
        expected: true
      }
    ],
    realm: "terraform",
    difficulty: "easy",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "terraform-103",
    title: "AWS S3 Bucket",
    description: "Create an AWS S3 bucket with proper naming and tags",
    starterCode: `# Configure AWS provider
provider "aws" {
  region = "us-east-1"
}

# TODO: Create an S3 bucket resource
# TODO: Use a unique bucket name with variables
# TODO: Add environment and project tags`,
    solutionCode: `# Configure AWS provider
provider "aws" {
  region = "us-east-1"
}

resource "aws_s3_bucket" "app_bucket" {
  bucket = "${var.project_name}-${var.environment}-bucket"

  tags = {
    Environment = var.environment
    Project     = var.project_name
    ManagedBy   = "Terraform"
  }
}`,
    hints: [
      {
        message: "S3 bucket names must be globally unique"
      },
      {
        message: "Always tag your resources for better organization",
        revealCode: `resource "aws_s3_bucket" "app_bucket" {
  bucket = "${var.project_name}-${var.environment}-bucket"
}`
      }
    ],
    tests: [
      {
        description: "Should create an S3 bucket with tags",
        input: null,
        expected: true
      }
    ],
    realm: "terraform",
    difficulty: "medium",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "terraform-104",
    title: "EC2 Instance with Security Group",
    description: "Create an EC2 instance with a custom security group",
    starterCode: `# TODO: Create a security group allowing SSH (port 22)
# TODO: Create an EC2 instance using the security group
# TODO: Use t2.micro instance type`,
    solutionCode: `resource "aws_security_group" "web_sg" {
  name        = "web-security-group"
  description = "Security group for web server"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "web_server" {
  ami           = "ami-0c02fb55956c7d316"  # Amazon Linux 2
  instance_type = "t2.micro"
  
  vpc_security_group_ids = [aws_security_group.web_sg.id]

  tags = {
    Name = "Web Server"
  }
}`,
    hints: [
      {
        message: "Security groups act as virtual firewalls"
      },
      {
        message: "Reference other resources using resource_type.name.attribute",
        revealCode: `vpc_security_group_ids = [aws_security_group.web_sg.id]`
      }
    ],
    tests: [
      {
        description: "Should create EC2 with security group",
        input: null,
        expected: true
      }
    ],
    realm: "terraform",
    difficulty: "medium",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "terraform-105",
    title: "Using Data Sources",
    description: "Use data sources to fetch information about existing resources",
    starterCode: `# TODO: Get the most recent Amazon Linux 2 AMI
# TODO: Use the AMI ID in an EC2 instance`,
    solutionCode: `data "aws_ami" "amazon_linux" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*-x86_64-gp2"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

resource "aws_instance" "app_server" {
  ami           = data.aws_ami.amazon_linux.id
  instance_type = "t2.micro"
}`,
    hints: [
      {
        message: "Data sources allow you to query existing infrastructure"
      },
      {
        message: "Reference data sources with data.type.name.attribute",
        revealCode: `data "aws_ami" "amazon_linux" {
  most_recent = true
  owners      = ["amazon"]
}`
      }
    ],
    tests: [
      {
        description: "Should use data source for AMI",
        input: null,
        expected: true
      }
    ],
    realm: "terraform",
    difficulty: "medium",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "terraform-106",
    title: "Terraform State Commands",
    description: "Write Terraform commands for state management",
    starterCode: `# TODO: Initialize a new Terraform working directory
# TODO: Plan the infrastructure changes
# TODO: Apply the changes with auto-approve
# TODO: Show the current state`,
    solutionCode: `# Initialize a new Terraform working directory
terraform init

# Plan the infrastructure changes
terraform plan

# Apply the changes with auto-approve
terraform apply -auto-approve

# Show the current state
terraform show`,
    hints: [
      {
        message: "Always run 'terraform init' first in a new directory"
      },
      {
        message: "Use 'terraform plan' to preview changes before applying",
        revealCode: `terraform init
terraform plan`
      }
    ],
    tests: [
      {
        description: "Should use correct Terraform commands",
        input: null,
        expected: true
      }
    ],
    realm: "terraform",
    difficulty: "easy",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "terraform-107",
    title: "Modules and Reusability",
    description: "Create a reusable Terraform module for a web server",
    starterCode: `# modules/webserver/main.tf
# TODO: Define input variables for instance_type and server_name
# TODO: Create an EC2 instance resource
# TODO: Output the instance public IP`,
    solutionCode: `# modules/webserver/variables.tf
variable "instance_type" {
  description = "EC2 instance type"
  default     = "t2.micro"
}

variable "server_name" {
  description = "Name tag for the server"
}

# modules/webserver/main.tf
resource "aws_instance" "web" {
  ami           = "ami-0c02fb55956c7d316"
  instance_type = var.instance_type

  tags = {
    Name = var.server_name
  }
}

# modules/webserver/outputs.tf
output "public_ip" {
  value = aws_instance.web.public_ip
}`,
    hints: [
      {
        message: "Modules help you create reusable infrastructure components"
      },
      {
        message: "Modules have their own variables, resources, and outputs",
        revealCode: `variable "instance_type" {
  default = "t2.micro"
}`
      }
    ],
    tests: [
      {
        description: "Should create a reusable module structure",
        input: null,
        expected: true
      }
    ],
    realm: "terraform",
    difficulty: "hard",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "terraform-108",
    title: "Using Terraform Modules",
    description: "Use the webserver module you created",
    starterCode: `# main.tf
# TODO: Call the webserver module twice
# TODO: Create a "web-prod" server with t2.small
# TODO: Create a "web-dev" server with t2.micro`,
    solutionCode: `# main.tf
module "prod_server" {
  source = "./modules/webserver"
  
  server_name   = "web-prod"
  instance_type = "t2.small"
}

module "dev_server" {
  source = "./modules/webserver"
  
  server_name   = "web-dev"
  instance_type = "t2.micro"
}

output "prod_ip" {
  value = module.prod_server.public_ip
}

output "dev_ip" {
  value = module.dev_server.public_ip
}`,
    hints: [
      {
        message: "Use 'module' blocks to call modules"
      },
      {
        message: "Access module outputs with module.name.output_name",
        revealCode: `module "prod_server" {
  source = "./modules/webserver"
}`
      }
    ],
    tests: [
      {
        description: "Should use modules correctly",
        input: null,
        expected: true
      }
    ],
    realm: "terraform",
    difficulty: "medium",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "terraform-109",
    title: "Terraform Workspaces",
    description: "Use Terraform workspaces to manage multiple environments",
    starterCode: `# TODO: Create a new workspace called "staging"
# TODO: Switch to the staging workspace
# TODO: List all workspaces
# TODO: Delete a workspace`,
    solutionCode: `# Create a new workspace called "staging"
terraform workspace new staging

# Switch to the staging workspace
terraform workspace select staging

# List all workspaces
terraform workspace list

# Delete a workspace (must not be current)
terraform workspace select default
terraform workspace delete staging`,
    hints: [
      {
        message: "Workspaces allow you to manage multiple states"
      },
      {
        message: "You can't delete the current workspace",
        revealCode: `terraform workspace new staging
terraform workspace select staging`
      }
    ],
    tests: [
      {
        description: "Should demonstrate workspace commands",
        input: null,
        expected: true
      }
    ],
    realm: "terraform",
    difficulty: "medium",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "terraform-110",
    title: "Remote State with S3",
    description: "Configure Terraform to use S3 for remote state storage",
    starterCode: `# backend.tf
# TODO: Configure S3 backend
# TODO: Set bucket name
# TODO: Set key for state file
# TODO: Set region
# TODO: Enable state locking with DynamoDB`,
    solutionCode: `# backend.tf
terraform {
  backend "s3" {
    bucket         = "my-terraform-state-bucket"
    key            = "prod/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "terraform-state-lock"
  }
}

# Create DynamoDB table for state locking
resource "aws_dynamodb_table" "terraform_locks" {
  name         = "terraform-state-lock"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }
}`,
    hints: [
      {
        message: "Remote state enables team collaboration"
      },
      {
        message: "DynamoDB provides state locking to prevent conflicts",
        revealCode: `backend "s3" {
    bucket = "my-terraform-state-bucket"
    key    = "prod/terraform.tfstate"
}`
      }
    ],
    tests: [
      {
        description: "Should configure remote state backend",
        input: null,
        expected: true
      }
    ],
    realm: "terraform",
    difficulty: "hard",
    currentAttempts: 0,
    showSolution: false
  }
];