terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region = "eu-central-1"
}

resource "aws_instance" "app_server" {
  ami           = "ami-0b6d93cdc64f77ea8"
  instance_type = "t2.micro"
  tags = {
    Name = "ExampleAppServerInstance"
  }
}
